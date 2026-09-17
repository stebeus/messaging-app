import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import '#index.css';

const Root = () => (
	<>
		<Outlet />
		<TanStackRouterDevtools position="bottom-right" />
	</>
);

export const Route = createRootRoute({
	component: Root,
});
