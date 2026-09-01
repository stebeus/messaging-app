import type { UserQuery } from '@repo/contracts/users';

import { parseId } from '#db/helpers.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import { parseFriendshipId } from '#routes/friendships/helpers.ts';
import { create, destroy, findFirst, findMany, update } from '#routes/friendships/repository.ts';
import * as memberRepository from '#routes/members/repository.ts';
import { NotFoundError } from '#utils/errors.ts';

export const addFriend = async (receiverId: string, senderId: string) => {
	const id = parseFriendshipId(receiverId, senderId);
	return await create({ ...id, status: 'pending' });
};

export const findFriendRequests = async (receiverId: string, query: UserQuery) => {
	const userAId = parseId(receiverId);
	return await findMany({ ...query, userAId, status: 'pending' });
};

const getFriendRequest = async (receiverId: string, senderId: string) => {
	const id = parseFriendshipId(receiverId, senderId);
	const friendRequest = await findFirst({ ...id, status: 'pending' });

	if (friendRequest == null) throw new NotFoundError({ message: 'Friend Request Not Found' });
	return friendRequest;
};

export const acceptFriendRequest = async (receiverId: string, senderId: string) => {
	const { userAId, userBId } = await getFriendRequest(receiverId, senderId);
	const { id } = await conversationRepository.create({ type: 'direct' });

	await memberRepository.create({ userId: userAId, conversationId: id, role: 'member' });
	await memberRepository.create({ userId: userBId, conversationId: id, role: 'member' });

	return await update({ userAId, userBId, status: 'accepted' });
};

export const rejectFriendRequest = async (receiverId: string, senderId: string) => {
	const { userAId, userBId } = await getFriendRequest(receiverId, senderId);
	return await destroy({ userAId, userBId });
};
