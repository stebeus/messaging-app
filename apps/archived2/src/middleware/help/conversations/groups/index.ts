import { Hono } from 'hono';

import { CreateGroupBody, GroupParams } from '@repo/contracts/conversations/groups';
import { Query } from '@repo/contracts/shared';

import { destroy } from '#middleware/help/conversation-repository.ts';
import { requireAuth, validate } from '#middleware/index.ts';

import { findFirst, findMany, update } from './repository.ts';
import { createGroup } from './services.ts';

export const groups = new Hono();

groups.get('/', validate('query', Query), async (c) => {
	const query = c.req.valid('query');
	const data = await findMany(query);
	return c.json({ data });
});

groups.get('/:groupId', validate('param', GroupParams), async (c) => {
	const { groupId } = c.req.valid('param');
	const data = await findFirst(groupId);
	return c.json({ data });
});

groups.post('/', validate('json', CreateGroupBody), requireAuth, async (c) => {
	const body = c.req.valid('json');
	const { id } = c.var.auth.user;

	const data = await createGroup(body, Number(id));

	return c.json({ data }, 201);
});

groups.patch(
	'/:groupId',
	validate('json', CreateGroupBody),
	validate('param', GroupParams),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const body = c.req.valid('param');

		const data = await update({ ...body, conversationId: groupId });

		return c.json({ data });
	},
);

groups.delete('/:groupId', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const data = await destroy(groupId);
	return c.json({ data });
});
