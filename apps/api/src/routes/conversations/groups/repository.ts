import type { NewGroup } from '@repo/contracts/conversations/groups';

import { eq } from 'drizzle-orm';

import { db, del, insert, update } from '#db/index.ts';

import { groups } from './schema.ts';

export const create = async (group: NewGroup) => await insert(groups, group);

export const findMany = async () => await db.query.groups.findMany();

export const modify = async (group: NewGroup) =>
	await update(groups, group, eq(groups.conversationId, group.conversationId));

export const remove = async (id: number) => await del(groups, eq(groups.conversationId, id));
