import { Hono } from 'hono';

import { UserParameters, UserQuery } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import * as userRepository from './repository.ts';
import * as userService from './services.ts';

export const users = new Hono();

users.get('/', validate('query', UserQuery), async (c) => {
	const query = c.req.valid('query');
	const data = await userRepository.find({ query });
	return c.json({ data });
});

users.get('/:userId', validate('param', UserParameters), async (c) => {
	const params = c.req.valid('param');
	const data = await userService.getOne(params);
	return c.json({ data });
});
