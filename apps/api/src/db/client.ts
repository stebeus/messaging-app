import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';

import { conversationRelations, relationshipRelations, userRelations } from './relations/index.ts';

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations: { ...conversationRelations, ...relationshipRelations, ...userRelations },
});
