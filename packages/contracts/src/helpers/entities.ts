import * as z from 'zod';

export const id = z.string().regex(/^[1-9]\d*$/);

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
