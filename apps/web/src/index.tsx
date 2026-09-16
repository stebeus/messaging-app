import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { routeTree } from './route-tree.gen.ts';

const root = document.getElementById('root');
if (root == null) throw new Error('Element with id `#root` is missing');

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

if (!root.innerHTML) createRoot(root).render(<RouterProvider router={router} />);
