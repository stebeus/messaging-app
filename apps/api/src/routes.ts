import { Hono } from 'hono';

import { dms } from '#modules/conversations/dms/routes.ts';
import { bans } from '#modules/conversations/groups/bans/routes.ts';
import { groups } from '#modules/conversations/groups/routes.ts';
import { friendRequests } from '#modules/friend-requests/routes.ts';
import { friends } from '#modules/friendships/routes.ts';
import { members } from '#modules/members/routes.ts';
import { messages } from '#modules/messages/routes.ts';
import { users } from '#modules/users/routes.ts';

export const routes = new Hono();

routes.route('/users', users);
routes.route('/friends', friends);
routes.route('/friend-requests', friendRequests);

routes.route('/', messages);
routes.route('/dms', dms);
routes.route('/groups', groups);
routes.route('/groups', members);
routes.route('/groups', bans);
