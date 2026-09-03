import type { RawFriendshipParameters } from '#routes/friendships/types.ts';
import type { RawUserParameters } from '#routes/users/types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import { parseFriendshipId } from '#routes/friendships/helpers.ts';
import * as friendshipRepository from '#routes/friendships/repository.ts';
import * as friendshipService from '#routes/friendships/services.ts';
import * as memberRepository from '#routes/members/repository.ts';

type SenderParameters = {
	senderId: string;
	recipientId: number;
};

type RecipientParameters = {
	recipientId: string;
	senderId: number;
};

const getOne = async (params: DatabaseContext<RawFriendshipParameters>) =>
	await friendshipService.getOne({ ...params, status: 'pending' });

export const send = async ({ senderId, recipientId }: SenderParameters) => {
	const parsedFriendshipId = parseFriendshipId({ user1Id: senderId, user2Id: recipientId });
	return await friendshipRepository.create(parsedFriendshipId);
};

export const find = async ({ userId }: RawUserParameters) =>
	await friendshipService.find({ userId, status: 'pending' });

export const accept = async ({ recipientId, senderId }: RecipientParameters) =>
	db.transaction(async (client) => {
		const { user1Id, user2Id } = await getOne({ user1Id: recipientId, user2Id: senderId, client });
		const { id } = await conversationRepository.create({ client });

		for (const userId of [user1Id, user2Id]) {
			await memberRepository.create({ userId, conversationId: id, client });
		}

		return await friendshipRepository.update({ user1Id, user2Id, status: 'accepted', client });
	});

export const cancel = async (params: RawFriendshipParameters) => {
	const { user1Id, user2Id } = await getOne(params);
	return await friendshipRepository.destroy({ user1Id, user2Id });
};
