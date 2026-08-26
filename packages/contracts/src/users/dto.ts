import z from 'zod';

import { id } from '#utils.js';

export const UserParams = z.object({
	userId: id,
});

export type UserParams = z.infer<typeof UserParams>;
