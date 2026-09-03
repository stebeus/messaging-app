import type { Friendship } from '@repo/contracts/friendships';
import type { RawUserParameters } from '#routes/users/types.ts';
import type { RawFriendshipParameters } from './types.ts';

import { type DatabaseContext, parseId } from '#db/index.ts';
import { NotFoundError } from '#utils/errors.ts';

import { parseFriendshipId } from './helpers.ts';
import * as friendshipRepository from './repository.ts';

type RawRecipientFriendships = RawUserParameters & Pick<Friendship, 'status'>;

type GetFriendshipParameters = RawFriendshipParameters & Pick<Friendship, 'status'>;

export const find = async ({ userId, status }: RawRecipientFriendships) =>
	await friendshipRepository.find({ user1Id: parseId(userId), status });

export const getOne = async ({
	status,
	client,
	...params
}: DatabaseContext<GetFriendshipParameters>) => {
	const parsedFriendshipId = parseFriendshipId(params);
	const friendship = await friendshipRepository.findOne({ ...parsedFriendshipId, status, client });

	if (friendship == null) throw new NotFoundError({ message: 'Friendship Not Found' });

	return friendship;
};
