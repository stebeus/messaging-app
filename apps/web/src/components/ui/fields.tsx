import type { RenderProps } from '#types/ui.ts';

import { useId } from 'react';

import { useFieldContext } from '#lib/form.ts';

type FieldRenderProps = {
	helperTextId?: string;
};

type FieldProps = {
	label: string;
	helperText?: string;
};

type ParentFieldProps = FieldProps & {
	children: RenderProps<FieldRenderProps>;
};

const Field = ({ label, helperText, children }: ParentFieldProps) => {
	const helperTextId = useId();

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label>
			<span>{label}</span>
			{children({ helperTextId: helperText == null ? undefined : helperTextId })}
			{helperText != null && <span id={helperTextId}>{helperText}</span>}
		</label>
	);
};

export const TextField = ({ label, helperText }: FieldProps) => {
	const field = useFieldContext<string>();

	return (
		<Field label={label} helperText={helperText}>
			{({ helperTextId }) => (
				<input
					aria-describedby={helperTextId}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
				/>
			)}
		</Field>
	);
};
