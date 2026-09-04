import * as z from 'zod';

import { id } from '#shared/entities.js';

export const MemberParameters = z.object({
	memberId: id,
});

export type MemberParameters = z.infer<typeof MemberParameters>;
