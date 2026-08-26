import { defineRelations } from 'drizzle-orm';

import * as conversations from '#routes/conversations/schemas.ts';
import * as auth from '#routes/users/schema.ts';

export const relations = defineRelations({ ...auth, ...conversations }, (r) => ({
	users: {
		groups: r.many.groups({
			from: r.users.id,
			to: r.groups.ownerId,
		}),
		members: r.many.members({
			from: r.users.id,
			to: r.members.userId,
		}),
	},
	conversations: {
		groups: r.one.groups({
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
		user: r.one.users({
			from: r.groups.ownerId,
			to: r.users.id,
		}),
	},
	members: {
		conversation: r.one.conversations({
			from: r.members.conversationId,
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
	},
}));
