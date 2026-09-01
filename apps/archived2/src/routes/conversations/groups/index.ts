import { Hono } from 'hono';

import { CreateGroupBody, GroupParams } from '@repo/contracts/groups';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';

import { findJoined, findMany } from './repository.ts';
import { createGroup, deleteGroup, editGroup, getJoinedGroup } from './services.ts';

export const groups = new Hono();

groups.get('/', validate('query', Query), async (c) => {
	const query = c.req.valid('query');
	const data = await findMany(query);
	return c.json({ data });
});

groups.get('/me', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await findJoined(user.id);
	return c.json({ data });
});

groups.get('/:groupId', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await getJoinedGroup(groupId, user.id);

	return c.json({ data });
});

groups.post('/', validate('json', CreateGroupBody), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const body = c.req.valid('json');

	const data = await createGroup(user.id, body);

	return c.json({ data }, 201);
});

groups.patch(
	'/:groupId',
	validate('param', GroupParams),
	validate('json', CreateGroupBody),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await editGroup(groupId, user.id, body);

		return c.json({ data });
	},
);

groups.delete('/:groupId', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await deleteGroup(groupId, user.id);

	return c.json({ data });
});
