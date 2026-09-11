import type { Relationship } from '@repo/contracts/relationships';
import type { ListUserArgs } from '#modules/users/types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { dmService } from '#modules/conversations/dms/services.ts';
import { NotFoundError } from '#utils/errors.ts';

import { mergeFriend, orderFriendshipIds } from './helpers.ts';
import { friendshipRepository } from './repository.ts';

const create = async ({ tx, ...params }: DatabaseContext<Relationship>) => {
	const friendshipId = orderFriendshipIds(params);
	return await friendshipRepository.create({ ...friendshipId, tx });
};

const find = async (params: ListUserArgs) => {
	const friendships = await friendshipRepository.find(params);
	return friendships.map(mergeFriend);
};

const findOne = async ({ tx, ...params }: DatabaseContext<Relationship>) => {
	const friendshipId = orderFriendshipIds(params);
	return await friendshipRepository.findOne({ ...friendshipId, tx });
};

const getOne = async (params: DatabaseContext<Relationship>) => {
	const friendship = await findOne(params);
	if (friendship == null) throw new NotFoundError({ resource: 'friendship' });
	return friendship;
};

const unfriend = async (params: Relationship) =>
	db.transaction(async (tx) => {
		const { user1Id, user2Id } = await getOne({ ...params, tx });
		await dmService.destroyByFriendship({ user1Id, user2Id, tx });
		return await friendshipRepository.destroy({ user1Id, user2Id, tx });
	});

export const friendshipService = { create, find, findOne, getOne, unfriend } as const;
