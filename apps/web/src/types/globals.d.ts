import 'react';

declare module 'react' {
	type StandardCommand =
		| 'show-modal'
		| 'close'
		| 'request-close'
		| 'show-popover'
		| 'hide-popover'
		| 'toggle-popover';

	interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
		command?: StandardCommand | `--${string}`;
		commandFor?: string;
	}
}
