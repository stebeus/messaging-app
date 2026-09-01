import { defineRelations } from 'drizzle-orm';

import * as conversation from '#routes/conversations/schemas.ts';
import * as friendship from '#routes/users/friendships/schema.ts';

import * as auth from './schemas/auth/schema.ts';

export const relations = defineRelations({ ...auth, ...friendship, ...conversation }, (r) => ({
	// Users
	users: {
		friendships: r.many.friendships({
			from: r.users.id,
			to: r.friendships.userAId,
		}),
		groups: r.many.groups({
			from: r.users.id,
			to: r.groups.ownerId,
		}),
	},
	friendships: {
		users: r.many.users({
			from: r.friendships.userBId,
			to: r.users.id,
		}),
	},

	// Conversations
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
		conversations: r.one.conversations({
			from: r.groups.conversationId,
			to: r.conversations.id,
		}),
		users: r.many.users({
			from: r.groups.ownerId,
			to: r.users.id,
		}),
	},
	members: {
		conversations: r.one.conversations({
			from: r.messages.conversationId,
			to: r.conversations.id,
		}),
		users: r.many.users({
			from: r.members.userId,
			to: r.users.id,
		}),
	},
	messages: {
		conversations: r.one.conversations({
			from: r.messages.conversationId,
			to: r.conversations.id,
		}),
		users: r.many.users({
			from: r.messages.senderId,
			to: r.users.id,
		}),
	},
}));
