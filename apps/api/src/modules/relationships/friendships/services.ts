import type { FindUserParameters } from '#modules/users/types.ts';
import type { FriendshipParameters } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { NotFoundError } from '#utils/errors.ts';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';
import { friendshipRepository } from './repository.ts';

const getOne = async ({ tx = db, ...params }: DatabaseContext<FriendshipParameters>) => {
	const friendship = await friendshipRepository.findOne(params);
	if (friendship == null) throw new NotFoundError({ resource: 'Friendship' });
	return friendship;
};

const create = async ({ tx, ...params }: DatabaseContext<FriendshipParameters>) => {
	const friendshipIds = orderFriendshipIds(params);
	return await friendshipRepository.create({ ...friendshipIds, tx });
};

const find = async ({ userId, query }: FindUserParameters) => {
	const friendships = await friendshipRepository.find({ user1Id: userId, user2Id: userId, query });
	return friendships.map(mergeFriend);
};

const unfriend = async (params: FriendshipParameters) =>
	db.transaction(async (tx) => {
		const { user1Id, user2Id } = await getOne({ ...params, tx });
		await dmService.destroyByFriendship({ ...params, tx });
		return await friendshipRepository.destroy({ user1Id, user2Id, tx });
	});

export const friendshipService = { create, find, unfriend } as const;
