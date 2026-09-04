import * as z from 'zod';

export const id = z.coerce.number().int().positive();

export const createdAt = z.date();

export const updatedAt = z.date();

export const timestamps = { createdAt: true, updatedAt: true } as const;

export const base = { ...timestamps, id: true } as const;

export const Id = z.object({ id });

export const Timestamps = z.object({ createdAt, updatedAt });

export const Base = z.object({
	...Id.shape,
	...Timestamps.shape,
});

export type Id = z.infer<typeof Id>;

export type Base = z.infer<typeof Base>;

export type Timestamps = z.infer<typeof Timestamps>;
