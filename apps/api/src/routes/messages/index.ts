import { Hono } from 'hono';

import { DirectMessageParameters } from '@repo/contracts/conversations';
import { GroupParameters } from '@repo/contracts/groups';
import { CreateMessageBody, MessageParameters, UpdateMessageBody } from '@repo/contracts/messages';
import { Query } from '@repo/contracts/shared';

import { requireAuth, validate } from '#middleware/index.ts';

import * as messageRepository from './repository.ts';
import * as messageService from './services.ts';

export const messages = new Hono();

// Messages
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

// DMs
messages.get(
	'/dms/:dmId/messages',
	validate('param', DirectMessageParameters),
	validate('query', Query),
	async (c) => {
		const { dmId } = c.req.valid('param');
		const query = c.req.valid('query');

		const data = await messageRepository.find({ conversationId: dmId, query });

		return c.json({ data });
	},
);

messages.post(
	'/dms/:dmId/messages',
	validate('param', DirectMessageParameters),
	validate('json', CreateMessageBody),
	requireAuth,
	async (c) => {
		const { dmId } = c.req.valid('param');
		const { user } = c.var.auth;
		const { content } = c.req.valid('json');

		const data = await messageService.send({ conversationId: dmId, userId: user.id, content });

		return c.json({ data }, 201);
	},
);

// Groups
messages.get(
	'/groups/:groupId/messages/',
	validate('param', GroupParameters),
	validate('query', Query),
	async (c) => {
		const { groupId } = c.req.valid('param');
		const query = c.req.valid('query');

		const data = await messageRepository.find({ conversationId: groupId, query });

		return c.json({ data });
	},
);

messages.post(
	'/groups/:groupId/messages',
	validate('param', GroupParameters),
	validate('json', CreateMessageBody),
	requireAuth,
	async (c) => {
		const { groupId } = c.req.valid('param');
		const { user } = c.var.auth;
		const { content } = c.req.valid('json');

		const data = await messageService.send({ conversationId: groupId, userId: user.id, content });

		return c.json({ data }, 201);
	},
);

messages.patch(
	'/groups/:groupId/messages/:messageId',
	validate('param', GroupParameters),
	validate('param', MessageParameters),
	validate('json', UpdateMessageBody),
	requireAuth,
	async (c) => {
		const params = c.req.valid('param');
		const { user } = c.var.auth;
		const { content } = c.req.valid('json');

		const data = await messageService.editWithPermission({ ...params, actorId: user.id, content });

		return c.json({ data });
	},
);

messages.patch(
	'/groups/:groupId/messages/:messageId',
	validate('param', GroupParameters),
	validate('param', MessageParameters),
	requireAuth,
	async (c) => {
		const params = c.req.valid('param');
		const { user } = c.var.auth;

		const data = await messageService.destroyWithPermission({ ...params, actorId: user.id });

		return c.json({ data });
	},
);
