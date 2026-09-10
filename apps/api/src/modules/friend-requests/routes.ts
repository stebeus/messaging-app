import { Hono } from 'hono';

import {
	AcceptFriendRequestParameters,
	SendFriendRequestParameters,
} from '@repo/contracts/friend-requests';
import { UserParameters, UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import { friendRequestRepository } from './repository.ts';
import { friendRequestService } from './services.ts';

export const friendRequests = new Hono();

friendRequests.get('/', validate('query', UserQuery), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const query = c.req.valid('query');

	const data = await friendRequestRepository.find({ userId: user.id, query });

	return c.json({ data });
});

friendRequests.post(
	'/:recipientId',
	validate('param', SendFriendRequestParameters),
	requireAuth,
	async (c) => {
		const { user } = c.var.auth;
		const { recipientId } = c.req.valid('param');

		const data = await friendRequestService.send({ requesterId: user.id, recipientId });

		return c.json({ data }, 201);
	},
);

friendRequests.post(
	'/:requesterId/accept',
	validate('param', AcceptFriendRequestParameters),
	requireAuth,
	async (c) => {
		const { user } = c.var.auth;
		const { requesterId } = c.req.valid('param');

		const data = await friendRequestService.accept({ recipientId: user.id, requesterId });

		return c.json({ data }, 201);
	},
);

friendRequests.delete('/:userId', validate('param', UserParameters), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const { userId } = c.req.valid('param');

	const data = await friendRequestService.cancel({ user1Id: user.id, user2Id: userId });

	return c.json({ data });
});
