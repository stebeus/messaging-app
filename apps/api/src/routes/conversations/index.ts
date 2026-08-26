import { Hono } from 'hono';

import { ConversationParams, NewConversation } from '@repo/contracts/conversations';

import { validate } from '#middleware/validator.ts';

import { groups } from './groups/index.ts';
import { members } from './members/index.ts';
import { messages } from './messages/index.ts';
import { create, findFirst, findMany, remove } from './repository.ts';

export const conversations = new Hono();

conversations.get('/', async (c) => c.json({ data: await findMany() }));

conversations.get('/:memberId', validate('param', ConversationParams), async (c) => {
	const { conversationId } = c.req.valid('param');
	const data = await findFirst(conversationId);
	return c.json({ data });
});

conversations.post('/', validate('json', NewConversation), async (c) => {
	const body = c.req.valid('json');
	const data = await create(body);
	return c.json({ data });
});

conversations.delete('/:memberId', validate('param', ConversationParams), async (c) => {
	const { conversationId } = c.req.valid('param');
	const data = await remove(conversationId);
	return c.json({ data });
});

conversations.basePath('/:memberId');

conversations.route('/groups', groups);
conversations.route('/members', members);
conversations.route('/messages', messages);
