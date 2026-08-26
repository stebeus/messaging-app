import z from 'zod';

import { id } from '#utils.js';

export const MemberParams = z.object({
	memberId: id,
});

export type MemberParams = z.infer<typeof MemberParams>;
