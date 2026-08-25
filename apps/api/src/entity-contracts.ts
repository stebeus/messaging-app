import * as z from 'zod';

export const id = z.int().positive();

export const timestamps = z.object({
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Timestamps = keyof z.infer<typeof timestamps>;

export const User = z.object({
	id,
	name: z.string(),
	email: z.email(),
	emailVerified: z.boolean().default(false),
	image: z.url().optional(),
	...timestamps.shape,
});

export type User = z.infer<typeof User>;

export type NewUser = Omit<User, 'id' | Timestamps>;

export type UserUpdate = Omit<User, Timestamps>;

const { createdAt, updatedAt } = timestamps.shape;

export const Friendship = z.object({
	userId: id,
	friendId: id,
	createdAt,
});

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = Omit<Friendship, 'createdAt'>;

export const Conversation = z.object({
	id,
	name: z.string().optional(),
	type: z.enum(['direct', 'group']).default('direct'),
	...timestamps.shape,
});

export type Conversation = z.infer<typeof Conversation>;

export type NewConversation = Omit<Conversation, 'id' | Timestamps>;

export type ConversationUpdate = Omit<Conversation, Timestamps>;

export const ConversationMember = z.object({
	memberId: id,
	conversationId: id,
	role: z.enum(['member', 'admin', 'owner']).default('member'),
	joinedAt: createdAt,
	updatedAt,
});

export type ConversationMember = z.infer<typeof ConversationMember>;

export type NewConversationMember = Omit<ConversationMember, 'id' | 'joinedAt' | 'updatedAt'>;

export type ConversationMemberUpdate = Omit<ConversationMember, 'joinedAt' | 'updatedAt'>;

export const Message = z.object({
	id,
	content: z.string(),
	...timestamps.shape,
	senderId: id.optional(),
	conversationId: id,
});

export type Message = z.infer<typeof Message>;

export type NewMessage = Omit<Message, 'id' | Timestamps>;

export type MessageUpdate = Omit<Message, Timestamps>;
