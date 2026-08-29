import * as z from 'zod';

export const createEnv = <Schema extends Record<string, z.ZodType>>(
	env: unknown,
	schema: Schema,
) => {
	const Env = z.object(schema);
	const { success, error, data } = z.safeParse(Env, env);

	if (!success) throw new Error(z.prettifyError(error));
	return data;
};
