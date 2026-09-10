import type { FriendRequestParameters } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { type FriendshipParameters, friendshipService } from '#modules/friendships/index.ts';
import { userService } from '#modules/users/services.ts';
import { ConflictError, NotFoundError } from '#utils/errors.ts';

import { friendRequestRepository } from './repository.ts';

const send = async ({ requesterId, recipientId }: FriendRequestParameters) => {
	const { id } = await userService.getOne({ userId: recipientId });
	const friendship = await friendshipService.findOne({ user1Id: requesterId, user2Id: id });

	if (friendship != null) throw new ConflictError();

	return await friendRequestRepository.create({ requesterId, recipientId: id });
};

const getOne = async ({ requesterId, recipientId }: DatabaseContext<FriendRequestParameters>) => {
	const friendRequest = await friendRequestRepository.findOne({
		user1Id: requesterId,
		user2Id: recipientId,
	});

	if (friendRequest == null) throw new NotFoundError({ resource: 'Friend Request' });

	return friendRequest;
};

const accept = async (params: FriendRequestParameters) =>
	db.transaction(async (tx) => {
		const { requesterId, recipientId } = await getOne({ ...params, tx });

		await dmService.create({ user1Id: requesterId, user2Id: recipientId, tx });
		await friendRequestRepository.destroy({ requesterId, recipientId, tx });

		return await friendshipService.create({ user1Id: requesterId, user2Id: recipientId, tx });
	});

const cancel = async ({ user1Id, user2Id }: FriendshipParameters) => {
	const { requesterId, recipientId } = await getOne({ requesterId: user1Id, recipientId: user2Id });
	return await friendRequestRepository.destroy({ requesterId, recipientId });
};

export const friendRequestService = { send, accept, cancel } as const;
