import { Router } from 'express';

import { UserParams } from '@repo/contracts/users';
import { FriendshipParams } from '@repo/contracts/users/friendships';

import { validate } from '#middleware/validator.ts';

import { create, findFirst, findMany, remove } from './repository.ts';

export const friendships = Router({ mergeParams: true });

friendships.get('/', validate({ params: UserParams }), async (_req, res) => {
	const { userId } = res.locals.params;
	const data = await findMany(userId);
	return res.json({ data });
});

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
