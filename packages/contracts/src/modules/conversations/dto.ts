import * as z from 'zod';

import { Member } from '#modules/members/entity.js';
import { Message } from '#modules/messages/entity.js';
import { id } from '#shared/entities.js';

import { Conversation } from './entity.js';

export const ConversationParams = z.object({
	conversationId: id,
});

export const DirectMessageParams = z.object({
	dmId: id,
});

export const DirectMessageResponse = z.object({
	...Conversation.shape,
	members: z.array(Member),
	messages: z.array(Message),
});

export const ListDirectMessageResponse = z.array(DirectMessageResponse);

export type ConversationParams = z.infer<typeof ConversationParams>;

export type DirectMessageParams = z.infer<typeof DirectMessageParams>;

export type DirectMessageResponse = z.infer<typeof DirectMessageResponse>;

export type ListDirectMessageResponse = z.infer<typeof ListDirectMessageResponse>;
