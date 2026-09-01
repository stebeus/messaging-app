import { db } from '#db/client.ts';

export const findMany = async (userId: string) =>
	await db.query.conversations.findMany({
		where: { type: 'direct', members: { userId: Number(userId) } },
		with: { members: true, messages: true },
	});

export const findFirst = async (id: number, userId: string) =>
	await db.query.conversations.findFirst({
		where: { id, type: 'direct', members: { userId: Number(userId) } },
		with: { members: true, messages: true },
	});
