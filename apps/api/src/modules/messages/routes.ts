import { Hono } from 'hono';

import { ConversationParameters } from '@repo/contracts/conversations';
import { CreateMessageBody, MessageParameters, UpdateMessageBody } from '@repo/contracts/messages';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';

import { messageService } from './services.ts';

export const messages = new Hono();

messages.get(
	'/conversations/:conversationId/messages',
	validate('param', ConversationParameters),
	validate('query', Query),
	requireAuth,
	async (c) => {
		const { conversationId } = c.req.valid('param');
		const { user } = c.var.auth;
		const query = c.req.valid('query');

		const data = await messageService.find({ conversationId, userId: user.id, query });

		return c.json({ data });
	},
);

messages.post(
	'/conversations/:conversationId/messages',
	validate('param', ConversationParameters),
	validate('json', CreateMessageBody),
	requireAuth,
	async (c) => {
		const { conversationId } = c.req.valid('param');
		const { user } = c.var.auth;
		const { content } = c.req.valid('json');

		const data = await messageService.send({ conversationId, userId: user.id, content });

		return c.json({ data }, 201);
	},
);

messages.patch(
	'/messages/:messageId',
	validate('param', MessageParameters),
	validate('json', UpdateMessageBody),
	requireAuth,
	async (c) => {
		const { messageId } = c.req.valid('param');
		const { user } = c.var.auth;
		const { content } = c.req.valid('json');

		const data = await messageService.edit({ messageId, userId: user.id, content });

		return c.json({ data });
	},
);

messages.delete(
	'/messages/:messageId',
	validate('param', MessageParameters),
	requireAuth,
	async (c) => {
		const { messageId } = c.req.valid('param');
		const { user } = c.var.auth;

		const data = await messageService.destroy({ messageId, userId: user.id });

		return c.json({ data });
	},
);
