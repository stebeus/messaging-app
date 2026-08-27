import { Router } from 'express';

import { ConversationParams, NewConversation } from '@repo/contracts/conversations';

import { validate } from '#middleware/validator.ts';

import { groups } from './groups/index.ts';
import { members } from './members/index.ts';
import { messages } from './messages/index.ts';
import { create, findFirst, findMany, remove } from './repository.ts';

export const conversations = Router();

conversations.get('/', async (_req, res) => res.json({ data: await findMany() }));

conversations.get(
	'/:conversationId',
	validate({ params: ConversationParams }),
	async (_req, res) => {
		const { conversationId } = res.locals.validated.params;
		const data = await findFirst(conversationId);
		return res.json({ data });
	},
);

conversations.post('/', validate({ body: NewConversation }), async (_req, res) => {
	const { body } = res.locals.validated;
	const data = await create(body);
	return res.json({ data });
});

conversations.delete(
	'/:conversationId',
	validate({ params: ConversationParams }),
	async (_req, res) => {
		const { conversationId } = res.locals.validated.params;
		const data = await remove(conversationId);
		return res.json({ data });
	},
);

conversations.use('/:conversationId/groups', groups);
conversations.use('/:conversationId/members', members);
conversations.use('/:conversationId/messages', messages);
