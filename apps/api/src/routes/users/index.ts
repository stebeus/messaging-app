import { Router } from 'express';

import { PatchUserBody, UserParams } from '@repo/contracts/users';

import { validate } from '#middleware/validator.ts';

import { friendships } from './friendships/index.ts';
import { findFirst, findMany, modify, remove } from './repository.ts';

export const users = Router();

users.get('/', async (_req, res) => res.json({ data: await findMany() }));

users.get('/:userId', validate({ params: UserParams }), async (_req, res) => {
	const { userId } = res.locals.params;
	const data = await findFirst(userId);
	return res.json({ data });
});

users.patch(
	'/:userId',
	validate({ params: UserParams, body: PatchUserBody }),
	async (_req, res) => {
		const {
			params: { userId },
			body,
		} = res.locals;

		const data = await modify({ ...body, id: userId });

		return res.json({ data });
	},
);

users.delete('/:userId', validate({ params: UserParams }), async (_req, res) => {
	const { userId } = res.locals.params;
	const data = await remove(userId);
	return res.json({ data });
});

users.use('/:userId/friendships', friendships);
