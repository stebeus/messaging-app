import { getFormErrors } from '#hooks/form.ts';

type FormErrorProps = {
	message: string;
};

type FormErrorsProps = {
	error: Error;
};

const FormError = ({ message }: FormErrorProps) => (
	<li aria-live="assertive" role="alert">
		{message}
	</li>
);

const renderFormError = (message: string, index: number) => (
	<FormError message={message} key={index} />
);

export const FormErrors = ({ error }: FormErrorsProps) => {
	const errors = getFormErrors(error);
	return <ul>{errors.map(renderFormError)}</ul>;
};
