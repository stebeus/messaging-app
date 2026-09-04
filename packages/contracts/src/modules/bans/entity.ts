import * as z from 'zod';

import { id, Timestamps, timestamps } from '#shared/entities.js';

export const conversationTypes = ['direct', 'group'] as const;

export const Ban = z.object({
	...Timestamps.shape,
	userId: id,
	groupId: id,
});

export const NewBan = Ban.omit(timestamps);

export const BanUpdate = Ban.omit(timestamps);

export type Ban = z.infer<typeof Ban>;

export type NewBan = z.infer<typeof NewBan>;

export type BanUpdate = z.infer<typeof BanUpdate>;
