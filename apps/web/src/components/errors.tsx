import type { RenderProps } from '#types/ui.ts';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { FetchError } from '#utils/fetch.ts';

import { Button } from './ui/index.ts';

type ErrorFallbackProps<ErrorConstructor extends Error = Error> = {
	error: ErrorConstructor;
	reset: () => void;
};

type ErrorBoundaryProps = {
	fallback: ReactNode | RenderProps<ErrorFallbackProps>;
	children: ReactNode;
};

type ErrorBoundaryState = {
	error?: Error;
};

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => (
	<>
		<h1>{FetchError.isFetchError(error) ? error.status : 500}</h1>
		<p>{error.message}</p>
		<Button onClick={reset}>Reload</Button>
	</>
);

const renderErrorFallback = (props: ErrorFallbackProps) => <ErrorFallback {...props} />;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	static defaultProps = { fallback: renderErrorFallback };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	state: ErrorBoundaryState = {};

	componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
		console.log(error, componentStack);
	}

	reset = () => this.setState({ error: undefined });

	render() {
		const { error } = this.state;
		const { children, fallback } = this.props;

		if (error == null) return children;
		return typeof fallback === 'function' ? fallback({ error, reset: this.reset }) : fallback;
	}
}
