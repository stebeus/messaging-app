import { Hono } from 'hono';

import { FriendParameters } from '@repo/contracts/friendships';

import { requireAuth, validate } from '#middleware/index.ts';

import * as friendService from './services.ts';

export const friends = new Hono();

friends.get('/', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await friendService.find({ userId: user.id });
	return c.json({ data });
});

friends.delete('/:friendId', validate('param', FriendParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { friendId } = c.req.valid('param');

	const data = await friendService.unfriend({ userId: user.id, friendId });

	return c.json({ data });
});
