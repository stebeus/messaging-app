import type { UserParams } from '@repo/contracts/users';

import { NotFoundError } from '#utils/errors.ts';

import { userRepository } from './repository.ts';

const getOne = async ({ userId }: UserParams) => {
	const user = await userRepository.findOne({ id: userId });
	if (user == null) throw new NotFoundError({ resource: 'user' });
	return user;
};

export const userService = { getOne } as const;
