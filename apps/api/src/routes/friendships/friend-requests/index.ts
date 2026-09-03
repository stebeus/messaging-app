import { Hono } from 'hono';

import { UserParameters } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import * as friendRequestService from './services.ts';

export const friendRequests = new Hono();

friendRequests.get('/', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await friendRequestService.find({ userId: user.id });
	return c.json({ data });
});

friendRequests.post('/:userId', validate('param', UserParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { userId } = c.req.valid('param');

	const data = await friendRequestService.send({ senderId: user.id, recipientId: userId });

	return c.json({ data }, 201);
});

friendRequests.patch('/:userId', validate('param', UserParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { userId } = c.req.valid('param');

	const data = await friendRequestService.accept({ recipientId: user.id, senderId: userId });

	return c.json({ data });
});

friendRequests.delete('/:userId', validate('param', UserParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { userId } = c.req.valid('param');

	const data = await friendRequestService.cancel({ user1Id: user.id, user2Id: userId });

	return c.json({ data });
});
