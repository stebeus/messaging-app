import { Hono } from 'hono';

import { UserParams, UserQuery } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import { find, findFirst } from './repository.ts';

export const users = new Hono();

users.get('/', validate('query', UserQuery), async (c) => {
	const query = c.req.valid('query');
	const data = await find(query);
	return c.json({ data });
});

users.get('/:userId', validate('param', UserParams), async (c) => {
	const { userId } = c.req.valid('param');
	const data = await findFirst(userId);
	return c.json({ data });
});
