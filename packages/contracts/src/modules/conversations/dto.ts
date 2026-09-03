import * as z from 'zod';

import { id } from '#shared/entities.js';

export const DirectMessageParameters = z.object({
	dmId: id,
});

export type DirectMessageParameters = z.infer<typeof DirectMessageParameters>;
