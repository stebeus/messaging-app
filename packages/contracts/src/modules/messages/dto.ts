import * as z from 'zod';

import { User } from '#modules/users/entity.js';
import { id } from '#shared/entities.js';

import { Message, MessageUpdate, NewMessage } from './entity.js';

export const MessageParams = z.object({
	messageId: id,
});

export const CreateMessageBodyRequest = NewMessage.pick({ content: true });

export const UpdateMessageBodyRequest = MessageUpdate.pick({ content: true });

export const MessageResponse = z.object({
	...Message.shape,
	sender: User,
});

export type MessageParams = z.infer<typeof MessageParams>;

export type CreateMessageBodyRequest = z.infer<typeof CreateMessageBodyRequest>;

export type UpdateMessageBodyRequest = z.infer<typeof UpdateMessageBodyRequest>;

export type MessageResponse = z.infer<typeof MessageResponse>;
