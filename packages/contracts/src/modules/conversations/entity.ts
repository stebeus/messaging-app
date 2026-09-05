import * as z from 'zod';

import { createdAt, id } from '#shared/entities.js';

export const conversationTypes = ['direct', 'group'] as const;

export const Conversation = z.object({
	id,
	type: z.enum(conversationTypes).default('direct'),
	createdAt,
});

export const NewConversation = Conversation.pick({ type: true });

export type Conversation = z.infer<typeof Conversation>;

export type ConversationSelection = z.input<typeof Conversation>;

export type NewConversation = z.input<typeof NewConversation>;
