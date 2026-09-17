import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { SubmitButton } from '#components/ui/button.tsx';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {},
	formComponents: { SubmitButton },
	fieldContext,
	formContext,
});
