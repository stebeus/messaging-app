import z from 'zod';

import { id } from '#utils.js';

export const MessageParams = z.object({
	messageId: id,
});

export type MessageParams = z.infer<typeof MessageParams>;
