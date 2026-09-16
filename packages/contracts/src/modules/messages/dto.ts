import * as z from 'zod';

import { id } from '#shared/entities.js';

import { MessageUpdate, NewMessage } from './entity.js';

export const MessageParams = z.object({
	messageId: id,
});

export const CreateMessageBodyRequest = NewMessage.pick({ content: true });

export const UpdateMessageBodyRequest = MessageUpdate.pick({ content: true });

export type MessageParams = z.infer<typeof MessageParams>;

export type CreateMessageBodyRequest = z.infer<typeof CreateMessageBodyRequest>;

export type UpdateMessageBodyRequest = z.infer<typeof UpdateMessageBodyRequest>;
