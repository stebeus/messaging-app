import type { NewConversation } from '@repo/contracts/conversations';
import type { IdParameters } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import {
	conversations,
	type DatabaseContext,
	DeletionError,
	db,
	InsertionError,
} from '#db/index.ts';

const create = async ({ tx = db, ...values }: DatabaseContext<NewConversation>) => {
	const [data] = await tx.insert(conversations).values(values).returning();
	if (data == null) throw new InsertionError('Conversation', values);
	return data;
};

const destroy = async ({ id, tx = db }: DatabaseContext<IdParameters>) => {
	const [data] = await tx.delete(conversations).where(eq(conversations.id, id)).returning();
	if (data == null) throw new DeletionError('Conversation', { id });
	return data;
};

export const conversationRepository = { create, destroy } as const;
