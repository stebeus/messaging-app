import type { RenderProps } from '#types/ui.ts';

import { useId } from 'react';

import { toCamelCase } from '#utils/formatters.ts';

type FieldProps = {
	label: string;
	helperText?: string;
};

export type FieldRenderProps = {
	name: string;
	helperTextId?: string;
};

type ParentFieldProps = FieldProps & {
	children: RenderProps<FieldRenderProps>;
};

export const Field = ({ label, helperText, children }: ParentFieldProps) => {
	const name = toCamelCase(label);
	const helperTextId = useId();

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the children are form controls
		<label>
			<span>{label}</span>
			{children({ name, helperTextId: helperText == null ? undefined : helperTextId })}
			{helperText != null && <span id={helperTextId}>{helperText}</span>}
		</label>
	);
};

export const renderField = (props: ParentFieldProps, index: number) => (
	<Field {...props} key={index} />
);
