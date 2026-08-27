import z from 'zod';

import { id } from '#utils.js';

import { NewMessage } from './entity.js';

export const MessageBody = NewMessage.omit({ conversationId: true });

export const MessageParams = z.object({
	messageId: id,
});

export type MessageBody = z.infer<typeof MessageBody>;

export type MessageParams = z.infer<typeof MessageParams>;
