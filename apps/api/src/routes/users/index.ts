import { Hono } from 'hono';

import { UserParams, UserUpdate } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import { friendships } from './friendships/index.ts';
import { findFirst, findMany, modify, remove } from './repository.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.get('/:userId', validate('param', UserParams), async (c) => {
	const { userId } = c.req.valid('param');
	const data = await findFirst(userId);
	return c.json({ data });
});

users.patch('/:userId', validate('param', UserParams), validate('json', UserUpdate), async (c) => {
	const { userId } = c.req.valid('param');
	const body = c.req.valid('json');

	const data = await modify({ ...body, id: userId });

	return c.json({ data });
});

users.delete('/:userId', validate('param', UserParams), async (c) => {
	const { userId } = c.req.valid('param');
	const data = await remove(userId);
	return c.json({ data });
});

users.route('/:userId/friendships', friendships);
