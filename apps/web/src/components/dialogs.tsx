import type { ComponentProps } from 'react';

import {
	type CommandProps,
	InvokerButton,
	InvokerProvider,
	PopoverClose,
	PopoverTrigger,
	useInvoker,
} from './ui/index.ts';

export type DialogProps = ComponentProps<'dialog'>;

const ModalWindow = (props: DialogProps) => {
	const { id } = useInvoker();
	return <dialog {...props} id={id} />;
};

const DialogWindow = (props: DialogProps) => <ModalWindow {...props} popover="auto" />;

const ModalTrigger = ({ children }: CommandProps) => (
	<InvokerButton command="show-modal">{children}</InvokerButton>
);

const ModalClose = ({ children }: CommandProps) => (
	<InvokerButton command="close">{children}</InvokerButton>
);

export const Modal = {
	Root: InvokerProvider,
	Window: ModalWindow,
	Trigger: ModalTrigger,
	Close: ModalClose,
};

export const Dialog = {
	Root: InvokerProvider,
	Window: DialogWindow,
	Trigger: PopoverTrigger,
	Close: PopoverClose,
};
