import { Hono } from 'hono';

import { FriendParameters } from '@repo/contracts/friendships';
import { UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import { friendshipService } from './services.ts';

export const friends = new Hono();

friends.get('/', validate('query', UserQuery), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const query = c.req.valid('query');

	const data = await friendshipService.find({ userId: user.id, query });

	return c.json({ data });
});

friends.delete('/:friendId', validate('param', FriendParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { friendId } = c.req.valid('param');

	const data = await friendshipService.unfriend({ user1Id: user.id, user2Id: friendId });

	return c.json({ data });
});
