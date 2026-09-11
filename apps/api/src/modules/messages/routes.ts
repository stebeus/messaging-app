import { Hono } from 'hono';

import { ConversationParams } from '@repo/contracts/conversations';
import { CreateMessageBody, MessageParams, UpdateMessageBody } from '@repo/contracts/messages';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';

import { messageService } from './services.ts';

export const messages = new Hono();

messages.get(
	'/conversations/:conversationId/messages',
	validate('param', ConversationParams),
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
	validate('param', ConversationParams),
	validate('json', CreateMessageBody),
	requireAuth,
	async (c) => {
		const { conversationId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await messageService.send({ conversationId, userId: user.id, body });

		return c.json({ data }, 201);
	},
);

messages.patch(
	'/messages/:messageId',
	validate('param', MessageParams),
	validate('json', UpdateMessageBody),
	requireAuth,
	async (c) => {
		const { messageId } = c.req.valid('param');
		const { user } = c.var.auth;
		const body = c.req.valid('json');

		const data = await messageService.edit({ messageId, userId: user.id, body });

		return c.json({ data });
	},
);

messages.delete(
	'/messages/:messageId',
	validate('param', MessageParams),
	requireAuth,
	async (c) => {
		const { messageId } = c.req.valid('param');
		const { user } = c.var.auth;

		const data = await messageService.destroy({ messageId, userId: user.id });

		return c.json({ data });
	},
);
