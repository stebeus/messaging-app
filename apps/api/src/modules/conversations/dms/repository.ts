import type { Relationship } from '@repo/contracts/relationships';
import type { ConversationMember } from '#modules/conversations/types.ts';

import { type DatabaseContext, db, orderBy } from '#db/index.ts';
import { conversationRelations, memberOf } from '#modules/conversations/helpers.ts';
import { containsDisplayName, type ListUserArgs } from '#modules/users/index.ts';

const type = 'direct';

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<ListUserArgs>) =>
	await tx.query.conversations.findMany({
		where: { member: { userId, user: containsDisplayName(q) }, type },
		with: conversationRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ id, userId, tx = db }: DatabaseContext<ConversationMember>) =>
	await tx.query.conversations.findFirst({
		where: { ...memberOf(userId), id, type },
		with: conversationRelations,
	});

const findOneByFriendship = async ({ user1Id, user2Id, tx = db }: DatabaseContext<Relationship>) =>
	await tx.query.conversations.findFirst({
		where: { members: { AND: [{ userId: user1Id }, { userId: user2Id }] }, type },
	});

export const dmRepository = { find, findOne, findOneByFriendship } as const;
