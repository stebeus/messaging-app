import type { ConversationParameters } from '#modules/conversations/types.ts';
import type { FriendshipParameters } from '#modules/friendships/types.ts';

import { type DatabaseContext, db, orderBy } from '#db/index.ts';
import { conversationRelations, memberOf } from '#modules/conversations/helpers.ts';
import { containsDisplayName, type UserSearchParameters } from '#modules/users/index.ts';

const type = 'direct';

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<UserSearchParameters>) =>
	await tx.query.conversations.findMany({
		where: { member: { userId, user: containsDisplayName(q) }, type },
		with: conversationRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ id, userId, tx = db }: DatabaseContext<ConversationParameters>) =>
	await tx.query.conversations.findFirst({
		where: { ...memberOf(userId), id, type },
		with: conversationRelations,
	});

const findOneByFriendship = async ({
	user1Id,
	user2Id,
	tx = db,
}: DatabaseContext<FriendshipParameters>) =>
	await tx.query.conversations.findFirst({
		where: { members: { AND: [{ userId: user1Id }, { userId: user2Id }] }, type },
	});

export const dmRepository = { find, findOne, findOneByFriendship } as const;
