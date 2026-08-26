import z from 'zod';

import { id } from '#utils.js';

export const ConversationParams = z.object({
	conversationId: id,
});

export type ConversationParams = z.infer<typeof ConversationParams>;
