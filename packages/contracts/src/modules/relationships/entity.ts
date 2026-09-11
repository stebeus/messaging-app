import * as z from 'zod';

import { id } from '#shared/entities.js';

export const Relationship = z.object({
	user1Id: id,
	user2Id: id,
});

export type Relationship = z.infer<typeof Relationship>;
