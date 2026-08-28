import { Router } from 'express';

import { FriendshipParams } from '@repo/contracts/users/friendships';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, remove } from './repository.ts';

export const friendships = Router({ mergeParams: true });

friendships.get('/', async (_req, res) => res.json({ data: await findMany() }));

friendships.get('/:friendId', validate({ params: FriendshipParams }), async (_req, res) => {
	const { params } = res.locals;
	const data = await findFirst(params);
	return res.json({ data });
});

friendships.post('/:friendId', validate({ params: FriendshipParams }), async (_req, res) => {
	const { params } = res.locals;
	const data = await create(params);
	return res.json({ data });
});

friendships.delete('/:friendId', validate({ params: FriendshipParams }), async (_req, res) => {
	const { params } = res.locals;
	const data = await remove(params);
	return res.json({ data });
});
