import * as z from 'zod';

export const id = z.coerce.number().int().positive();

export const createdAt = z.date();

export const updatedAt = z.date();

export const Timestamps = z.object({
	createdAt,
	updatedAt,
});

export const Base = z.object({
	...Timestamps.shape,
	id,
});

export const timestamps = { createdAt: true, updatedAt: true } as const;

export const base = { ...timestamps, id: true } as const;
