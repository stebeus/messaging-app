import { Hono } from 'hono';

import { UserParams } from '@repo/contracts/users';
import { FriendshipParams } from '@repo/contracts/users/friendships';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, remove } from './repository.ts';

export const friendships = new Hono();

friendships.get('/', async (c) => c.json({ data: await findMany() }));

friendships.get(
	'/:friendId',
	validate('param', UserParams),
	validate('param', FriendshipParams),
	async (c) => {
		const friendship = c.req.valid('param');
		const data = await findFirst(friendship);
		return c.json({ data });
	},
);

friendships.post(
	'/:friendId',
	validate('param', UserParams),
	validate('param', FriendshipParams),
	async (c) => {
		const friendship = c.req.valid('param');
		const data = await create(friendship);
		return c.json({ data });
	},
);

friendships.delete(
	'/:friendId',
	validate('param', UserParams),
	validate('param', FriendshipParams),
	async (c) => {
		const friendship = c.req.valid('param');
		const data = await remove(friendship);
		return c.json({ data });
	},
);
