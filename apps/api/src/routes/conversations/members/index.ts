import { Router } from 'express';

import { ConversationParams } from '@repo/contracts/conversations';
import { MemberBody, MemberParams } from '@repo/contracts/conversations/members';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, modify, remove } from './repository.ts';

export const members = Router();

members.get('/', async (_req, res) => res.json({ data: await findMany() }));

members.get('/:memberId', validate({ params: MemberParams }), async (_req, res) => {
	const { memberId } = res.locals.params;
	const data = await findFirst(memberId);
	return res.json({ data });
});

members.post('/', validate({ params: ConversationParams, body: MemberBody }), async (_req, res) => {
	const {
		params: { conversationId },
		body,
	} = res.locals;

	// todo: get user id from auth
	const data = await create({ ...body, conversationId, userId: 1 });

	return res.json({ data });
});

members.patch(
	'/:memberId',
	validate({ params: { ...ConversationParams, ...MemberParams }, body: MemberBody }),
	async (_req, res) => {
		const {
			params: { conversationId, memberId },
			body,
		} = res.locals;

		const data = await modify({ ...body, conversationId, userId: memberId });

		return res.json({ data });
	},
);

members.delete('/:memberId', validate({ params: MemberParams }), async (_req, res) => {
	const { memberId } = res.locals;
	const data = await remove(memberId);
	return res.json({ data });
});
