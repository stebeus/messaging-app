import { Hono } from 'hono';

import { GroupParams } from '@repo/contracts/groups';
import { MemberParams, UpdateMemberBody } from '@repo/contracts/members';
import { UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';

import { memberService } from './services.ts';

export const members = new Hono();

members.get(
	'/',
	validate('param', GroupParams),
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

members.post('/', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.joinGroup({ groupId, userId: user.id });

	return c.json({ data }, 201);
});

members.delete('/me', validate('param', GroupParams), requireAuth, async (c) => {
	const { groupId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.leaveGroup({ groupId, userId: user.id });

	return c.json({ data });
});

members.patch(
	'/:memberId',
	validate('param', MemberParams),
	validate('json', UpdateMemberBody),
	requireAuth,
	async (c) => {
		const { groupId, memberId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await memberService.changeRole({
			actorId: user.id,
			targetId: memberId,
			groupId,
			body,
		});

		return c.json({ data });
	},
);

members.delete('/:memberId', validate('param', MemberParams), requireAuth, async (c) => {
	const { groupId, memberId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.kick({ actorId: user.id, targetId: memberId, groupId });

	return c.json({ data });
});
