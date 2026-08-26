import { Hono } from 'hono';

import { conversations } from './conversations/index.ts';
import { users } from './users/index.ts';

export const routes = new Hono();

routes.route('/conversations', conversations);
routes.route('/users', users);
