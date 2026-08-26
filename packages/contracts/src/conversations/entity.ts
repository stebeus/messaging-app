import * as z from 'zod';

import { Base, base } from '#utils.js';

export const conversationTypes = ['direct', 'group'] as const;

export const Conversation = z.object({
	...Base.shape,
	type: z.enum(conversationTypes).default('direct'),
});

export const NewConversation = Conversation.omit(base);

export type Conversation = z.infer<typeof Conversation>;

export type NewConversation = z.infer<typeof NewConversation>;
