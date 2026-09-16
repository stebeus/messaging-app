import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.gen.ts';

export const getRouter = () =>
	createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
	});

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
