import * as z from 'zod';

import { id } from '#helpers/entities.js';

import { MessageUpdate, NewMessage } from './entity.js';

export const MessageParameters = z.object({
	messageId: id,
});

export const CreateMessageBody = NewMessage.pick({ content: true });

export const UpdateMessageBody = MessageUpdate.pick({ content: true });

export type MessageParameters = z.infer<typeof MessageParameters>;

export type CreateMessageBody = z.infer<typeof CreateMessageBody>;

export type UpdateMessageBody = z.infer<typeof UpdateMessageBody>;
