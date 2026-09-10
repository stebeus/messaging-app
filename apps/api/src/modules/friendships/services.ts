import type { UserSearchParameters } from '#modules/users/types.ts';
import type { FriendshipParameters } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { NotFoundError } from '#utils/errors.ts';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';
import { friendshipRepository } from './repository.ts';

const create = async ({ tx, ...params }: DatabaseContext<FriendshipParameters>) => {
	const friendshipIds = orderFriendshipIds(params);
	return await friendshipRepository.create({ ...friendshipIds, tx });
};

const find = async (params: UserSearchParameters) => {
	const friendships = await friendshipRepository.find(params);
	return friendships.map(mergeFriend);
};

const findOne = async ({ tx, ...params }: DatabaseContext<FriendshipParameters>) => {
	const friendshipIds = orderFriendshipIds(params);
	return await friendshipRepository.findOne({ ...friendshipIds, tx });
};

const getOne = async (params: DatabaseContext<FriendshipParameters>) => {
	const friendship = await findOne(params);
	if (friendship == null) throw new NotFoundError({ resource: 'Friendship' });
	return friendship;
};

const unfriend = async (params: FriendshipParameters) =>
	db.transaction(async (tx) => {
		const { user1Id, user2Id } = await getOne({ ...params, tx });
		await dmService.destroyByFriendship({ user1Id, user2Id, tx });
		return await friendshipRepository.destroy({ user1Id, user2Id, tx });
	});

export const friendshipService = { create, find, findOne, getOne, unfriend } as const;
