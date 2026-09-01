import { db } from '#db/client.ts';
import { conversationRelations, memberOf } from '#routes/conversations/helpers.ts';

const type = 'direct';

export const findMany = async (userId: string) =>
	await db.query.conversations.findMany({
		where: { ...memberOf(userId), type },
		with: conversationRelations,
	});

export const findFirst = async (id: number, userId: string) =>
	await db.query.conversations.findFirst({
		where: { ...memberOf(userId), id, type },
		with: conversationRelations,
	});

export const findFirstWithFriend = async (userAId: number, userBId: number) =>
	await db.query.conversations.findFirst({
		where: { members: { AND: [{ userId: userAId }, { userId: userBId }] } },
	});
