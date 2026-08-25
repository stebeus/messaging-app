import { defineRelations } from 'drizzle-orm';

import { users } from '#routes/auth/schema.ts';
import { messages } from '#routes/users/messages/schema.ts';

export const relations = defineRelations({ users, messages }, (r) => ({
	messages: {
		sender: r.one.users({
			from: r.messages.userId,
			to: r.users.id,
		}),
	},
}));
