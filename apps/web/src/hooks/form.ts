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

type FormErrorCause = {
	formErrors: string[];
	fieldErrors: Record<string, FieldErrors>;
};

type FormError = FetchError<FormErrorCause>;

const isFormError = (value: unknown) => FetchError.isFetchError<FormErrorCause>(value);

const getFieldError = ([message]: FieldErrors) => message;

export const getFormErrors = (error: Error | FormError) =>
	isFormError(error) && error.cause != null
		? Object.values(error.cause.fieldErrors).map(getFieldError)
		: [error.message];

export const useForm = (
	endpoint: string,
	onAction: () => void,
	{ metadata, method = 'POST' }: FormOptions = {},
) => {
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
