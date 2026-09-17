import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import '#index.css';

const Root = () => (
	<>
		<Outlet />
		<TanStackDevtools
			config={{ position: 'bottom-right' }}
			plugins={[
				formDevtoolsPlugin(),
				{ name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> },
			]}
		/>
	</>
);

export const Route = createRootRoute({
	component: Root,
});
