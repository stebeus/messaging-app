import { Hono } from 'hono';

import { CreateGroupBody, GroupParams, UpdateGroupBody } from '@repo/contracts/groups';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';
import { members } from '#modules/members/routes.ts';

import { bans } from './bans/routes.ts';
import { groupRepository } from './repository.ts';
import { groupService } from './services.ts';

export const groups = new Hono();

groups.get('/', validate('query', Query), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const query = c.req.valid('query');

	const data = await groupRepository.find({ userId: user.id, query });

	return c.json({ data });
});

groups.get('/me', validate('query', Query), requireAuth, async (c) => {
	const { user } = c.var.auth;
	const query = c.req.valid('query');

	const data = await groupRepository.findByMembership({ userId: user.id, query });

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
	validate('param', GroupParams),
	validate('json', UpdateGroupBody),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await groupService.edit({ groupId, userId: user.id, body });

		return c.json({ data });
	},
);

groups.delete('/:groupId', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await groupService.destroy({ groupId, userId: user.id });

	return c.json({ data });
});

groups.route('/:groupId/bans', bans);
groups.route('/:groupId/members', members);
