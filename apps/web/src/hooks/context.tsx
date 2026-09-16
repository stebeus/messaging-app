import { createContext, type ReactNode, use } from 'react';

type ProviderProps = Record<string, unknown> & {
	children?: ReactNode;
};

export const createSafeContext = <ContextValue, Props extends ProviderProps>(
	name: Capitalize<string>,
	valueFactory: (props: Props) => ContextValue,
) => {
	const Context = createContext<ContextValue | undefined>(undefined);

	const Provider = (props: Props & { children: ReactNode }) => (
		<Context value={valueFactory(props)}>{props.children}</Context>
	);

	const useSafeContext = () => {
		const SafeContext = use(Context);

		if (SafeContext == null) {
			throw new Error(`${name}Context must be used within a <${name}Provider>`);
		}

		return SafeContext;
	};

	return [Provider, useSafeContext] as const;
};
