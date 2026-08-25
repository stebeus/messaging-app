import { Hono } from 'hono';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, remove, update } from './repository.ts';
import { messageParamSchema, messageSchema } from './schema.ts';

export const messages = new Hono();

messages.get('/', async (c) => c.json({ data: await findMany() }));

messages.get('/:id', validate('param', messageParamSchema), async (c) => {
	const { id } = c.req.valid('param');
	const data = await findFirst(id);
	return c.json({ data });
});

messages.post(validate('json', messageSchema), async (c) => {
	const message = c.req.valid('json');
	const data = await create({ ...message, userId: 1 });
	return c.json({ data });
});

messages.patch(
	'/:id',
	validate('param', messageParamSchema),
	validate('json', messageSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		const message = c.req.valid('json');

		const data = await update({ id, ...message });

		return c.json({ data });
	},
);

messages.delete('/:id', validate('param', messageParamSchema), async (c) => {
	const { id } = c.req.valid('param');
	const data = await remove(id);
	return c.json({ data });
});
