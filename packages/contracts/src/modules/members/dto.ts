import * as z from 'zod';

import { id } from '#helpers/entities.js';

export const MemberParameters = z.object({
	memberId: id,
});

export type MemberParameters = z.infer<typeof MemberParameters>;
