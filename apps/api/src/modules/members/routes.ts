import { Hono } from 'hono';

import { GroupParameters } from '@repo/contracts/groups';
import { MemberParameters, UpdateMemberBody } from '@repo/contracts/members';
import { UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import { memberService } from './services.ts';

export const members = new Hono().basePath('/:groupId/members');

members.get(
	'/',
	validate('param', GroupParameters),
	validate('query', UserQuery),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const query = c.req.valid('query');

		const data = await memberService.find({ groupId, userId: user.id, query });

		return c.json({ data });
	},
);

members.post('/', validate('param', GroupParameters), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.joinGroup({ groupId, userId: user.id });

	return c.json({ data }, 201);
});

members.delete('/me', validate('param', GroupParameters), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.leaveGroup({ groupId, userId: user.id });

	return c.json({ data });
});

members.patch(
	'/:memberId',
	validate('param', GroupParameters),
	validate('param', MemberParameters),
	validate('json', UpdateMemberBody),
	requireAuth,
	async (c) => {
		const { groupId, memberId } = c.req.valid('param');
		const { user } = c.var.auth;
		const { role } = c.req.valid('json');

		const data = await memberService.changeRole({
			actorId: user.id,
			targetId: memberId,
			groupId,
			role,
		});

		return c.json({ data });
	},
);

members.delete(
	'/:memberId',
	validate('param', GroupParameters),
	validate('param', MemberParameters),
	requireAuth,
	async (c) => {
		const { groupId, memberId } = c.req.valid('param');
		const { user } = c.var.auth;

		const data = await memberService.kick({ actorId: user.id, targetId: memberId, groupId });

		return c.json({ data });
	},
);
