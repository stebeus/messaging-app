import type { NewConversation } from '@repo/contracts/conversations';
import type { Id } from '@repo/contracts/shared';

import { eq } from 'drizzle-orm';

import { CreationError, conversations, type DatabaseContext, db } from '#db/index.ts';

export const create = async ({
	client = db,
	...conversation
}: DatabaseContext<NewConversation>) => {
	const [data] = await client.insert(conversations).values(conversation).returning();
	if (data == null) throw new CreationError('conversation');
	return data;
};

export const destroy = async ({ id, client = db }: DatabaseContext<Id>) => {
	const [data] = await client.delete(conversations).where(eq(conversations.id, id)).returning();
	return data;
};
