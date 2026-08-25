import { Hono } from 'hono';

import { users } from './users/index.ts';

export const routes = new Hono();

routes.route('/users', users);
