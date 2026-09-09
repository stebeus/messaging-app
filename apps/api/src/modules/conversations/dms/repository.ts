import type { IdParameters } from '@repo/contracts/shared';
import type { UserParameters } from '@repo/contracts/users';
import type { FriendshipParameters } from '#modules/relationships/friendships/types.ts';
import type { FindUserParameters } from '#modules/users/types.ts';

import { type DatabaseContext, db, orderBy } from '#db/index.ts';
import { conversationRelations, memberOf } from '#modules/conversations/helpers.ts';
import { containsDisplayName } from '#modules/users/helpers.ts';

const type = 'direct';

const find = async ({
	userId,
	query: { q, sort, order },
	tx = db,
}: DatabaseContext<FindUserParameters>) =>
	await tx.query.conversations.findMany({
		where: { member: { userId, user: containsDisplayName(q) }, type },
		with: conversationRelations,
		...orderBy(sort, order),
	});

const findOne = async ({ id, userId, tx = db }: DatabaseContext<IdParameters & UserParameters>) =>
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
