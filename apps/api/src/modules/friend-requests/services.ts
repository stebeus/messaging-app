import type { FriendRequestParameters } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { friendshipService } from '#modules/friendships/services.ts';
import { NotFoundError } from '#utils/errors.ts';

import { friendRequestRepository } from './repository.ts';

const getOne = async (params: DatabaseContext<FriendRequestParameters>) => {
	const friendRequest = await friendRequestRepository.findOne(params);
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

const cancel = async (params: FriendRequestParameters) => {
	const { requesterId, recipientId } = await getOne(params);
	return await friendRequestRepository.destroy({ requesterId, recipientId });
};

export const friendRequestService = { accept, cancel } as const;
