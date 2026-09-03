import { Hono } from 'hono';

import { DirectMessageParameters } from '@repo/contracts/conversations';

import { requireAuth, validate } from '#middleware/index.ts';

import * as dmService from './services.ts';

export const dms = new Hono();

dms.get('/', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await dmService.find({ userId: user.id });
	return c.json({ data });
});

dms.get('/:dmId', validate('param', DirectMessageParameters), requireAuth, async (c) => {
	const { dmId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await dmService.getOne({ id: dmId, userId: user.id });

	return c.json({ data });
});
