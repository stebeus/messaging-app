import * as z from 'zod';

import { id } from '#shared/entities.js';

export const ConversationParams = z.object({
	conversationId: id,
});

export const DirectMessageParams = z.object({
	dmId: id,
});

export type ConversationParams = z.infer<typeof ConversationParams>;

export type DirectMessageParams = z.infer<typeof DirectMessageParams>;
