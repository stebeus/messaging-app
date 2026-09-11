import * as z from 'zod';

import { id } from '#shared/entities.js';

import { MessageUpdate, NewMessage } from './entity.js';

export const MessageParams = z.object({
	messageId: id,
});

export const CreateMessageBody = NewMessage.pick({ content: true });

export const UpdateMessageBody = MessageUpdate.pick({ content: true });

export type MessageParams = z.infer<typeof MessageParams>;

export type CreateMessageBody = z.infer<typeof CreateMessageBody>;

export type UpdateMessageBody = z.infer<typeof UpdateMessageBody>;
