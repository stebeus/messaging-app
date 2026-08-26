import * as z from 'zod';

import { Base, id, type Timestamps } from '#utils.js';

export const Message = z.object({
	...Base.shape,
	content: z.string(),
	senderId: id.optional(),
	conversationId: id,
});

export type Message = z.infer<typeof Message>;

export type NewMessage = Omit<Message, keyof Base>;

export type MessageUpdate = Omit<Message, keyof Timestamps>;
