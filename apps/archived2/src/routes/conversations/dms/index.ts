import { Hono } from 'hono';

import { DirectMessageParams } from '@repo/contracts/conversations';

import { requireAuth, validate } from '#middleware/index.ts';

import { findMany } from './repository.ts';
import { getDm } from './services.ts';

export const dms = new Hono();

dms.get('/', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await findMany(user.id);
	return c.json({ data });
});

dms.get('/:dmId', validate('param', DirectMessageParams), requireAuth, async (c) => {
	const { dmId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await getDm(dmId, user.id);

	return c.json({ data });
});
