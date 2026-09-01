import { defineRelations } from 'drizzle-orm';

import * as schema from '#db/schema.ts';

export * from './users.ts';

export const relations = defineRelations(schema, (r) => ({
	conversations: {
		group: r.one.groups({
			from: r.conversations.id,
			to: r.groups.conversationId,
		}),
		members: r.many.members({
			from: r.conversations.id,
			to: r.members.conversationId,
		}),
		messages: r.many.messages({
			from: r.conversations.id,
			to: r.messages.conversationId,
		}),
	},
	groups: {
		conversation: r.one.conversations({
			from: r.groups.conversationId,
			to: r.conversations.id,
		}),
		owner: r.one.users({
			from: r.groups.ownerId,
			to: r.users.id,
		}),
	},
	members: {
		conversation: r.one.conversations({
			from: r.messages.conversationId,
			to: r.conversations.id,
		}),
		user: r.one.users({
			from: r.members.userId,
			to: r.users.id,
		}),
	},
	messages: {
		conversation: r.one.conversations({
			from: r.messages.conversationId,
			to: r.conversations.id,
		}),
		sender: r.one.users({
			from: r.messages.senderId,
			to: r.users.id,
		}),
	},
}));
