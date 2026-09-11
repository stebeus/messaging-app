import { Hono } from 'hono';

import { GroupParams } from '@repo/contracts/groups';
import { MemberParams } from '@repo/contracts/members';
import { UserQuery } from '@repo/contracts/users';

import { requireAuth, validate } from '#middleware/index.ts';
import { groupService } from '#modules/conversations/groups/services.ts';
import { memberService } from '#modules/members/services.ts';

export const bans = new Hono();

bans.get(
	'/',
	validate('param', GroupParams),
	validate('query', UserQuery),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const query = c.req.valid('query');

		const data = await groupService.findBans({ groupId, userId: user.id, query });

		return c.json({ data });
	},
);

bans.post('/:memberId', validate('param', MemberParams), requireAuth, async (c) => {
	const { groupId, memberId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.ban({ groupId, actorId: user.id, targetId: memberId });

	return c.json({ data }, 201);
});

bans.delete('/:memberId', validate('param', MemberParams), requireAuth, async (c) => {
	const { groupId, memberId } = c.req.valid('param');
	const { user } = c.var.auth;

	const data = await memberService.unban({ groupId, actorId: user.id, targetId: memberId });

	return c.json({ data });
});
