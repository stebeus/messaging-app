import type { FriendRequestParameters } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import * as dmService from '#modules/conversations/dms/services.ts';
import * as friendshipService from '#modules/relationships/friendships/services.ts';
import { NotFoundError } from '#utils/errors.ts';

import * as friendRequestRepository from './repository.ts';

const getOne = async (params: DatabaseContext<FriendRequestParameters>) => {
	const friendRequest = await friendRequestRepository.findOne(params);
	if (friendRequest == null) throw new NotFoundError({ resource: 'Friend Request' });
	return friendRequest;
};

export const accept = async (params: FriendRequestParameters) =>
	db.transaction(async (tx) => {
		const { requesterId, recipientId } = await getOne({ ...params, tx });

		await dmService.create({ user1Id: requesterId, user2Id: recipientId, tx });
		await friendRequestRepository.destroy({ requesterId, recipientId, tx });

		return await friendshipService.create({ user1Id: requesterId, user2Id: recipientId, tx });
	});

export const cancel = async (params: FriendRequestParameters) => {
	const { requesterId, recipientId } = await getOne(params);
	return await friendRequestRepository.destroy({ requesterId, recipientId });
};
