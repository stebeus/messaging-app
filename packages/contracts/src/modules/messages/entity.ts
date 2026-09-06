import * as z from 'zod';

import { Base, base, id } from '#shared/entities.js';

export const Message = z.object({
	...Base.shape,
	senderId: id,
	conversationId: id,
	content: z.string(),
});

export const NewMessage = Message.omit(base);

export const MessageUpdate = Message.pick({ id: true, content: true }).partial({ content: true });

export type Message = z.infer<typeof Message>;

export type NewMessage = z.infer<typeof NewMessage>;

export type MessageUpdate = z.infer<typeof MessageUpdate>;
