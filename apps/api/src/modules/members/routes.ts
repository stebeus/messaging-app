import { Hono } from 'hono';

import { GroupParameters } from '@repo/contracts/groups';
import { MemberParameters, UpdateMemberBody } from '@repo/contracts/members';

import { requireAuth, validate } from '#middleware/index.ts';

import * as memberService from './services.ts';

export const members = new Hono();

members.post(
	'/groups/:groupId/members',
	validate('param', GroupParameters),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;

		const data = await memberService.joinGroup({ userId: user.id, groupId });

		return c.json({ data }, 201);
	},
);

members.patch(
	'/groups/:groupId/members/:memberId',
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
	'/groups/:groupId/members/:memberId',
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
