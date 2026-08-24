import type { ValidationTargets } from 'hono';
import type * as z from 'zod';

import { flattenErrors, sValidator } from '@hono/standard-validator';

import { ApiError } from '#utils/errors.ts';

export const validate = <Target extends keyof ValidationTargets, Schema extends z.ZodType>(
	target: Target,
	schema: Schema,
) =>
	sValidator(target, schema, (result) => {
		if (!result.success) throw new ApiError(400, { cause: flattenErrors(result.error) });
	});
