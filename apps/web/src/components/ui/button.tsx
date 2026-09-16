import { type ComponentPropsWithoutRef, useId } from 'react';

import { createSafeContext } from '#hooks/context.tsx';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export type CommandProps = Omit<ButtonProps, 'command'>;

export type SubmitButtonProps = Omit<ButtonProps, 'type'>;

export const Button = ({ type = 'button', ...props }: ButtonProps) => (
	<button {...props} type={type} />
);

export const [InvokerProvider, useInvoker] = createSafeContext('Invoker', () => ({ id: useId() }));

export const InvokerButton = (props: ButtonProps) => {
	const { id } = useInvoker();
	return <Button {...props} commandFor={id} />;
};

export const PopoverTrigger = (props: CommandProps) => (
	<InvokerButton {...props} command="toggle-popover" />
);

export const PopoverClose = (props: CommandProps) => (
	<InvokerButton {...props} command="hide-popover" />
);

export const SubmitButton = (props: SubmitButtonProps) => <Button {...props} type="submit" />;
