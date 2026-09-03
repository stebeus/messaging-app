import { Hono } from 'hono';

import { CreateGroupBody, GroupParameters, UpdateGroupBody } from '@repo/contracts/groups';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';

import * as groupRepository from './repository.ts';
import * as groupService from './services.ts';

export const groups = new Hono();

groups.get('/', validate('query', Query), async (c) => {
	const query = c.req.valid('query');
	const data = await groupRepository.find({ query });
	return c.json({ data });
});

groups.get('/me', requireAuth, async (c) => {
	const { user } = c.var.auth;
	const data = await groupService.findByMembership({ userId: user.id });
	return c.json({ data });
});

groups.get('/:groupId', validate('param', GroupParameters), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await groupService.getOneByMembership({ id: groupId, userId: user.id });

	return c.json({ data });
});

groups.post('/', validate('json', CreateGroupBody), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const body = c.req.valid('json');

	const data = await groupService.create({ userId: user.id, body });

	return c.json({ data }, 201);
});

groups.patch(
	'/:groupId',
	validate('param', GroupParameters),
	validate('json', UpdateGroupBody),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await groupService.edit({ id: groupId, userId: user.id, body });

		return c.json({ data });
	},
);

groups.delete('/:groupId', validate('param', GroupParameters), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await groupService.destroy({ id: groupId, userId: user.id });

	return c.json({ data });
});
