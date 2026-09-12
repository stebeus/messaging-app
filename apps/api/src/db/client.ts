import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '#env.ts';

import { conversationRelations, relationshipRelations, userRelations } from './relations/index.ts';

const relations = { ...conversationRelations, ...relationshipRelations, ...userRelations };

export const db = drizzle({
	connection: env.DATABASE_URL,
	relations,
});

export const testDb = drizzle({
	connection: env.TEST_DATABASE_URL,
	relations,
});
