import * as z from 'zod';

type ZodObject = Record<string, z.ZodType>;

export const createEnv = <Schema extends ZodObject>(env: unknown, schema: Schema) => {
	const envSchema = z.object(schema);
	const { success, error, data } = z.safeParse(envSchema, env);

	if (!success) throw new Error(z.prettifyError(error));

	return data;
};
