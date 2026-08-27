import { Router } from 'express';

import { ConversationParams } from '@repo/contracts/conversations';
import { MessageBody, MessageParams } from '@repo/contracts/conversations/messages';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, modify, remove } from './repository.ts';

export const messages = Router({ mergeParams: true });

messages.get('/', async (_req, res) => res.json({ data: await findMany() }));

messages.get('/:messageId', validate({ params: MessageParams }), async (_req, res) => {
	const { messageId } = res.locals.params;
	const data = await findFirst(messageId);
	return res.json({ data });
});

messages.post(
	'/',
	validate({ params: ConversationParams, body: MessageBody }),
	async (_req, res) => {
		const {
			params: { conversationId },
			body,
		} = res.locals;

		// todo: get user id from auth
		const data = await create({ ...body, conversationId, senderId: 2 });

		return res.json({ data });
	},
);

messages.patch(
	'/:messageId',
	validate({ params: MessageParams, body: MessageBody }),
	async (_req, res) => {
		const {
			params: { messageId },
			body,
		} = res.locals;

		const data = await modify({ ...body, id: messageId });

		return res.json({ data });
	},
);

messages.delete('/:messageId', validate({ params: MessageParams }), async (_req, res) => {
	const { messageId } = res.locals.params;
	const data = await remove(messageId);
	return res.json({ data });
});
