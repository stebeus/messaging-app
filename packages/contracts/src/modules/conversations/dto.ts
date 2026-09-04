import * as z from 'zod';

import { id } from '#helpers/entities.js';

export const ConversationParameters = z.object({
	conversationId: id,
});

export const DirectMessageParameters = z.object({
	dmId: id,
});

export type ConversationParameters = z.infer<typeof ConversationParameters>;

export type DirectMessageParameters = z.infer<typeof DirectMessageParameters>;
