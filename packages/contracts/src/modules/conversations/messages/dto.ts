import * as z from 'zod';

import { id } from '#shared/fields.js';
import { Query } from '#shared/index.js';

import { MessageUpdate, NewMessage } from './entity.js';

export const CreateMessageBody = NewMessage.pick({ content: true });

export const UpdateMessageBody = MessageUpdate.pick({ content: true });

export const MessageParams = z.object({
	messageId: id,
});

export const MessageQuery = Query.pick({ q: true });

export type CreateMessageBody = z.infer<typeof CreateMessageBody>;

export type UpdateMessageBody = z.infer<typeof UpdateMessageBody>;

export type MessageParams = z.infer<typeof MessageParams>;

export type MessageQuery = z.infer<typeof MessageQuery>;
