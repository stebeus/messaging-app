import type { NewUser, UserUpdate } from '@repo/contracts/users';

import { eq } from 'drizzle-orm';

import { db, del, update } from '#db/index.ts';

import { users } from './schema.ts';

export const create = async (user: NewUser) => {
	const [data] = await db.insert(users).values(user).onConflictDoNothing().returning();
	return data;
};

export const findMany = async () => await db.query.users.findMany();

export const findFirst = async (id: number) =>
	await db.query.users.findFirst({ where: { id }, with: { friendships: true } });

export const modify = async (user: UserUpdate) => await update(users, user, eq(users.id, user.id));

export const remove = async (id: number) => await del(users, eq(users.id, id));
