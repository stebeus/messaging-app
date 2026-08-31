import * as z from 'zod';

import { id } from '#shared/fields.js';

export const DirectMessageParams = z.object({
	dmId: id,
});

export type DirectMessageParams = z.infer<typeof DirectMessageParams>;
