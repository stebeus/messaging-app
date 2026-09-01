import { Hono } from 'hono';

import { DirectMessageParams } from '@repo/contracts/conversations';

import { requireAuth, validate } from '#middleware/index.ts';

import { findFirst, findMany } from './repository.ts';

export const dms = new Hono();

dms.get('/', requireAuth, async (c) => {
	const { id } = c.var.auth.user;
	const data = await findMany(id);
	return c.json({ data });
});

dms.get('/:groupId', validate('param', DirectMessageParams), requireAuth, async (c) => {
	const { dmId } = c.req.valid('param');
	const { id } = c.var.auth.user;

	const data = await findFirst(dmId, id);

	return c.json({ data });
});
