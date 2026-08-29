import z from 'zod';

import { id } from '#shared/fields.js';

export const DirectConversationParams = z.object({
	dmId: id,
});

export type DirectConversationParams = z.infer<typeof DirectConversationParams>;
