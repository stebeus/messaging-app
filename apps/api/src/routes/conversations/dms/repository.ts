import type { UserParameters } from '@repo/contracts/users';
import type { ParticipatedConversation } from '#routes/conversations/types.ts';
import type { FriendshipParameters } from '#routes/friendships/types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { conversationRelations, memberOf } from '#routes/conversations/helpers.ts';

const type = 'direct';

export const find = async ({ userId, client = db }: DatabaseContext<UserParameters>) =>
	await client.query.conversations.findMany({
		where: { ...memberOf(userId), type },
		with: conversationRelations,
	});

export const findOne = async ({
	id,
	userId,
	client = db,
}: DatabaseContext<ParticipatedConversation>) =>
	await client.query.conversations.findFirst({
		where: { ...memberOf(userId), id, type },
		with: conversationRelations,
	});

export const findOneByFriendship = async ({
	user1Id,
	user2Id,
	client = db,
}: DatabaseContext<FriendshipParameters>) =>
	await client.query.conversations.findFirst({
		where: { members: { AND: [{ userId: user1Id }, { userId: user2Id }], type } },
	});
