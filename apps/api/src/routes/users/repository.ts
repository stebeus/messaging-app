import type { NewUser, UserUpdate } from './schema.ts';

import { eq } from 'drizzle-orm';

import { db } from '#db/client.ts';
import { users } from '#routes/auth/schema.ts';

export const create = async (user: NewUser) => {
	const [data] = await db.insert(users).values(user).onConflictDoNothing().returning();
	return data;
};

export const findMany = async () => await db.query.users.findMany();

export const findFirst = async (id: number) => await db.query.users.findFirst({ where: { id } });

export const update = async (user: UserUpdate) => {
	const [data] = await db.update(users).set(user).where(eq(users.id, user.id)).returning();
	return data;
};

export const remove = async (id: number) => {
	const [data] = await db.delete(users).where(eq(users.id, id)).returning();
	return data;
};
