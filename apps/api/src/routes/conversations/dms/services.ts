import type { RawParticipatedConversation } from '#routes/conversations/types.ts';
import type { RawFriendshipParameters } from '#routes/friendships/types.ts';
import type { RawUserParameters } from '#routes/users/types.ts';

import { type DatabaseContext, parseId } from '#db/index.ts';
import { parseFriendshipId } from '#routes/friendships/helpers.ts';
import { NotFoundError } from '#utils/errors.ts';

import * as dmRepository from './repository.ts';

export const find = async ({ userId }: RawUserParameters) => {
	const parsedUserId = parseId(userId);
	return await dmRepository.find({ userId: parsedUserId });
};

export const getOne = async ({ id, userId }: RawParticipatedConversation) => {
	const parsedUserId = parseId(userId);
	const dm = await dmRepository.findOne({ id, userId: parsedUserId });

	if (dm == null) throw new NotFoundError({ message: 'Direct Message Not Found' });

	return dm;
};

export const getOneByFriendship = async ({
	client,
	...friendship
}: DatabaseContext<RawFriendshipParameters>) => {
	const parsedFriendshipId = parseFriendshipId(friendship);
	const dm = await dmRepository.findOneByFriendship({ ...parsedFriendshipId, client });

	if (dm == null) throw new NotFoundError({ message: 'Friend Direct Message Not Found' });

	return dm;
};
