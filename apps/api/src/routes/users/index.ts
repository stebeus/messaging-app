import { Hono } from 'hono';

import { validate } from '#middleware/validator.ts';

import { findFirst, findMany, remove, update } from './repository.ts';
import { newUserSchema, userParamSchema } from './schema.ts';

export const users = new Hono();

users.get('/', async (c) => c.json({ data: await findMany() }));

users.get('/:id', validate('param', userParamSchema), async (c) => {
	const { id } = c.req.valid('param');
	const data = await findFirst(id);
	return c.json({ data });
});

users.patch(
	'/:id',
	validate('param', userParamSchema),
	validate('json', newUserSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		const user = c.req.valid('json');

		const data = await update({ id, ...user });

		return c.json({ data });
	},
);

users.delete('/:id', validate('param', userParamSchema), async (c) => {
	const { id } = c.req.valid('param');
	const data = await remove(id);
	return c.json({ data });
});
