import type { RequestHandler } from 'express';

import * as z from 'zod';

import { handleBadRequestError } from './errors.ts';

type Schema = 'body' | 'headers' | 'params' | 'query';

type Schemas = Partial<Record<Schema, z.ZodObject>>;

export const validate =
	(schemas: Schemas): RequestHandler =>
	async (req, res, next) => {
		const entries = Object.entries(schemas) as [Schema, z.ZodObject][];

		for (const [key, schema] of entries) {
			const { success, error, data } = await schema.safeParseAsync(req[key]);

			if (!success) {
				const cause = z.flattenError(error);
				return handleBadRequestError(cause, req, res, next);
			}

			res.locals[key] = data;
		}

		next();
	};
