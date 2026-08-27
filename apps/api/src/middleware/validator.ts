import type { RequestHandler } from 'express';

import * as z from 'zod';

import { HttpError } from '#utils/errors.ts';

type Schema = 'body' | 'headers' | 'params' | 'query';

type Schemas = Partial<Record<Schema, z.ZodObject>>;

export const validate =
	(schemas: Schemas): RequestHandler =>
	async (req, res, next) => {
		const entries = Object.entries(schemas) as [Schema, z.ZodObject][];

		for (const [key, schema] of entries) {
			const { success, error, data } = await schema.safeParseAsync(req[key]);
			if (!success) throw new HttpError(400, { cause: z.flattenError(error) });
			res.locals.validated[key] = data;
		}

		next();
	};
