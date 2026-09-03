import type { FriendParameters } from '@repo/contracts/friendships';
import type { RawUserParameters } from '#routes/users/types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import * as dmService from '#routes/conversations/dms/services.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import * as friendshipRepository from '#routes/friendships/repository.ts';
import * as friendshipService from '#routes/friendships/services.ts';

type RawFriendParameters = RawUserParameters & FriendParameters;

const getOne = async ({ userId, friendId, client }: DatabaseContext<RawFriendParameters>) =>
	await friendshipService.getOne({
		user1Id: userId,
		user2Id: friendId,
		status: 'accepted',
		client,
	});

export const find = async ({ userId }: RawUserParameters) =>
	await friendshipService.find({ userId, status: 'accepted' });

export const unfriend = async ({ userId, friendId }: RawFriendParameters) =>
	db.transaction(async (client) => {
		const { id } = await dmService.getOneByFriendship({
			user1Id: userId,
			user2Id: friendId,
			client,
		});

		const { user1Id, user2Id } = await getOne({ userId, friendId, client });

		await conversationRepository.destroy({ id, client });

		return await friendshipRepository.destroy({ user1Id, user2Id, client });
	});
