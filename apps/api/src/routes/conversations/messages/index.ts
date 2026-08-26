import { Hono } from 'hono';

import { ConversationParams } from '@repo/contracts/conversations';
import { MessageParams, MessageUpdate } from '@repo/contracts/conversations/messages';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, modify, remove } from './repository.ts';

export const messages = new Hono();

messages.get('/', async (c) => c.json({ data: await findMany() }));

messages.get('/:memberId', validate('param', MessageParams), async (c) => {
	const { messageId } = c.req.valid('param');
	const data = await findFirst(messageId);
	return c.json({ data });
});

messages.post(
	'/',
	validate('param', ConversationParams),
	validate('json', MessageUpdate),
	async (c) => {
		const { conversationId } = c.req.valid('param');
		const body = c.req.valid('json');

		const data = await create({ ...body, conversationId, senderId: 1 });

		return c.json({ data });
	},
);

messages.patch(
	'/:memberId',
	validate('param', MessageParams),
	validate('json', MessageUpdate),
	async (c) => {
		const { messageId } = c.req.valid('param');
		const body = c.req.valid('json');

		const data = await modify({ ...body, id: messageId });

		return c.json({ data });
	},
);

messages.delete('/:memberId', validate('param', MessageParams), async (c) => {
	const { messageId } = c.req.valid('param');
	const data = await remove(messageId);
	return c.json({ data });
});
