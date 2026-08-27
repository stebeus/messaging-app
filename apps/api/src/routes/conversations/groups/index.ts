import { Router } from 'express';

import { ConversationParams } from '@repo/contracts/conversations';
import { GroupBody } from '@repo/contracts/conversations/groups';

import { validate } from '#middleware/validator.ts';

import { create, findMany, modify, remove } from './repository.ts';

export const groups = Router();

groups.get('/', async (_req, res) => res.json({ data: await findMany() }));

groups.post('/', validate({ params: ConversationParams, body: GroupBody }), async (_req, res) => {
	const {
		params: { conversationId },
		body,
	} = res.locals.validated;

	// todo: get user id from auth
	const data = await create({ ...body, conversationId, ownerId: 1 });

	return res.json({ data });
});

groups.patch('/', validate({ params: ConversationParams, body: GroupBody }), async (_req, res) => {
	const {
		params: { conversationId },
		body,
	} = res.locals.validated;

	const data = await modify({ ...body, conversationId });

	return res.json({ data });
});

groups.delete('/', validate({ params: ConversationParams }), async (_req, res) => {
	const { conversationId } = res.locals.validated.params;
	const data = await remove(conversationId);
	return res.json({ data });
});
