import * as z from 'zod';

import { Base } from '#utils.js';

export const conversationTypes = ['direct', 'group'] as const;

export const Conversation = z.object({
	...Base.shape,
	type: z.enum(conversationTypes).default('direct'),
});

export type Conversation = z.infer<typeof Conversation>;

export type NewConversation = Omit<Conversation, keyof Base>;
