import type { UserQuery } from '@repo/contracts/users';

import { parseId } from '#db/helpers.ts';
import { getFriendDm } from '#routes/conversations/dms/services.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import { parseFriendshipId } from '#routes/friendships/helpers.ts';
import { destroy, findFirst, findMany } from '#routes/friendships/repository.ts';
import { NotFoundError } from '#utils/errors.ts';

export const findFriends = async (receiverId: string, query: UserQuery) => {
	const userAId = parseId(receiverId);
	return await findMany({ ...query, userAId, status: 'accepted' });
};

const getFriend = async (receiverId: string, senderId: string) => {
	const id = parseFriendshipId(receiverId, senderId);
	const friend = await findFirst({ ...id, status: 'accepted' });

	if (friend == null) throw new NotFoundError({ message: 'Friend Not Found' });
	return friend;
};

export const removeFriend = async (receiverId: string, senderId: string) => {
	const { id } = await getFriendDm(receiverId, senderId);
	const { userAId, userBId } = await getFriend(receiverId, senderId);

	await conversationRepository.destroy(id);
	return await destroy({ userAId, userBId });
};
