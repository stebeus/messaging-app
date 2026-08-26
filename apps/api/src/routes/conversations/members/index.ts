import { Hono } from 'hono';

import { ConversationParams } from '@repo/contracts/conversations';
import { MemberParams, NewMember } from '@repo/contracts/conversations/members';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, modify, remove } from './repository.ts';

export const members = new Hono();

members.get('/', async (c) => c.json({ data: await findMany() }));

members.get('/:memberId', validate('param', MemberParams), async (c) => {
	const { memberId } = c.req.valid('param');
	const data = await findFirst(memberId);
	return c.json({ data });
});

members.post('/', validate('param', ConversationParams), validate('json', NewMember), async (c) => {
	const { conversationId } = c.req.valid('param');
	const body = c.req.valid('json');

	const data = await create({ ...body, conversationId, userId: 1 });

	return c.json({ data });
});

members.patch(
	'/:memberId',
	validate('param', ConversationParams),
	validate('param', MemberParams),
	validate('json', NewMember),
	async (c) => {
		const { conversationId, memberId } = c.req.valid('param');
		const body = c.req.valid('json');

		const data = await modify({ ...body, conversationId, userId: memberId });

		return c.json({ data });
	},
);

members.delete('/:memberId', validate('param', MemberParams), async (c) => {
	const { memberId } = c.req.valid('param');
	const data = await remove(memberId);
	return c.json({ data });
});
