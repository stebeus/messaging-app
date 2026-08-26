import * as z from 'zod';

import { Base, base, id, timestamps } from '#utils.js';

export const Message = z.object({
	...Base.shape,
	content: z.string(),
	senderId: id.optional(),
	conversationId: id,
});

export const NewMessage = Message.omit(base);

export const MessageUpdate = Message.omit(timestamps);

export type Message = z.infer<typeof Message>;

export type NewMessage = z.infer<typeof NewMessage>;

export type MessageUpdate = z.infer<typeof MessageUpdate>;
