import z from 'zod';

import { id } from '#utils.js';

import { NewUser } from './entity.js';

export const PatchUserBody = NewUser.partial();

export const UserParams = z.object({
	userId: id,
});

export type PatchUserBody = z.infer<typeof PatchUserBody>;

export type UserParams = z.infer<typeof UserParams>;
