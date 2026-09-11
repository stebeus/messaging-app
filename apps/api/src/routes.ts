import { Hono } from 'hono';

import { dms } from '#modules/conversations/dms/routes.ts';
import { groups } from '#modules/conversations/groups/routes.ts';
import { friendRequests } from '#modules/friend-requests/routes.ts';
import { friends } from '#modules/friendships/routes.ts';
import { messages } from '#modules/messages/routes.ts';
import { users } from '#modules/users/routes.ts';

export const routes = new Hono();

routes.route('/users', users);
routes.route('/friends', friends);
routes.route('/friend-requests', friendRequests);

routes.route('/', messages);
routes.route('/dms', dms);
routes.route('/groups', groups);
