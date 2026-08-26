import { Hono } from 'hono';

import { ConversationParams } from '@repo/contracts/conversations';
import { NewGroup } from '@repo/contracts/conversations/groups';

import { validate } from '#middleware/validator.ts';

import { create, findMany, modify, remove } from './repository.ts';

export const groups = new Hono();

groups.get('/', async (c) => c.json({ data: await findMany() }));

groups.post('/', validate('param', ConversationParams), validate('json', NewGroup), async (c) => {
	const { conversationId } = c.req.valid('param');
	const body = c.req.valid('json');

	const data = await create({ ...body, conversationId, ownerId: 1 });

	return c.json({ data });
});

groups.patch('/', validate('param', ConversationParams), validate('json', NewGroup), async (c) => {
	const { conversationId } = c.req.valid('param');
	const body = c.req.valid('json');

	const data = await modify({ ...body, conversationId });

	return c.json({ data });
});

groups.delete('/', validate('param', ConversationParams), async (c) => {
	const { conversationId } = c.req.valid('param');
	const data = await remove(conversationId);
	return c.json({ data });
});
