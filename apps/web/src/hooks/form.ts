import { type SubmitEvent, useState } from 'react';

import { catchError } from '@repo/errors';

import { FetchError, fetchData } from '#utils/fetch.ts';

type HttpMethod =
	| 'GET'
	| 'HEAD'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'CONNECT'
	| 'OPTIONS'
	| 'TRACE'
	| 'PATCH';

type FormOptions = Partial<{
	metadata: Record<string, unknown>;
	method: HttpMethod;
}>;

type FieldErrors = [string, ...string[]];

type FormErrorDetails = {
	formErrors: string[];
	fieldErrors: Record<string, FieldErrors>;
};

type FormError = FetchError<FormErrorDetails>;

const isFormError = (value: unknown) => FetchError.isFetchError<FormErrorDetails>(value);

const getFieldError = ([message]: FieldErrors) => message;

type FormHook = (
	endpoint: string,
	onAction: () => void,
	options?: FormOptions,
) => Readonly<{
	error: Error | FormError | undefined;
	submit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
}>;

export const getFormErrors = (error: Error | FormError) =>
	isFormError(error) && error.cause != null
		? Object.values(error.cause.fieldErrors).map(getFieldError)
		: [error.message];

export const useForm: FormHook = (endpoint, onAction, { metadata, method = 'POST' } = {}) => {
	const [error, setError] = useState<Error | FormError>();

	const submit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { target } = event;

		const formData = Object.fromEntries(new FormData(target));
		const body = JSON.stringify({ ...formData, ...metadata });

		try {
			await fetchData(endpoint, { method, headers: { 'content-type': 'application/json' }, body });
			target.reset();
			onAction();
		} catch (error) {
			const caught = isFormError(error) ? error : catchError(error);
			setError(caught);
		}
	};

	return { error, submit } as const;
};

export const useAppForm: FormHook = (endpoint, onAction, options) =>
	useForm(`v1/${endpoint}`, onAction, options);

export const useAuthForm: FormHook = (endpoint, onAction, options) =>
	useForm(`auth/${endpoint}`, onAction, options);
