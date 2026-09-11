import type { Relationship } from '@repo/contracts/relationships';
import type { ListUserArgs } from '#modules/users/types.ts';
import type { FriendRequestArgs } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { friendshipService } from '#modules/friendships/services.ts';
import { userService } from '#modules/users/services.ts';
import { ConflictError, NotFoundError } from '#utils/errors.ts';

import { groupFriendRequests } from './helpers.ts';
import { friendRequestRepository } from './repository.ts';

const send = async ({ requesterId, recipientId }: FriendRequestArgs) => {
	const { id } = await userService.getOne({ userId: recipientId });
	const friendship = await friendshipService.findOne({ user1Id: requesterId, user2Id: id });

	if (friendship != null) throw new ConflictError({ message: 'Friendship already exists' });

	return await friendRequestRepository.create({ requesterId, recipientId: id });
};

const find = async (params: ListUserArgs) => {
	const friendRequests = await friendRequestRepository.find(params);
	return groupFriendRequests(friendRequests);
};

const getOne = async ({ user1Id, user2Id }: DatabaseContext<Relationship>) => {
	const friendRequest = await friendRequestRepository.findOne({ user1Id, user2Id });
	if (friendRequest == null) throw new NotFoundError({ resource: 'friend request' });
	return friendRequest;
};

const accept = async (params: FriendRequestArgs) =>
	db.transaction(async (tx) => {
		const { requesterId, recipientId } = await getOne({
			user1Id: params.recipientId,
			user2Id: params.requesterId,
			tx,
		});

		await dmService.create({ user1Id: requesterId, user2Id: recipientId, tx });
		await friendRequestRepository.destroy({ requesterId, recipientId, tx });

		return await friendshipService.create({ user1Id: requesterId, user2Id: recipientId, tx });
	});

const cancel = async (params: Relationship) => {
	const { requesterId, recipientId } = await getOne(params);
	return await friendRequestRepository.destroy({ requesterId, recipientId });
};

export const friendRequestService = { send, find, accept, cancel } as const;
