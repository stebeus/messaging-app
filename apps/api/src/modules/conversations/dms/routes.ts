import { Hono } from 'hono';

import { DirectMessageParameters } from '@repo/contracts/conversations';
import { UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import { dmRepository } from './repository.ts';
import { dmService } from './services.ts';

export const dms = new Hono();

dms.get('/', validate('query', UserQuery), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const query = c.req.valid('query');

	const data = await dmRepository.find({ userId: user.id, query });

	return c.json({ data });
});

dms.get('/:dmId', validate('param', DirectMessageParameters), requireAuth, async (c) => {
	const { dmId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await dmService.getOne({ dmId, userId: user.id });

	return c.json({ data });
});
