import type { UserParameters } from '@repo/contracts/users';

import { NotFoundError } from '#utils/errors.ts';

import * as userRepository from './repository.ts';

export const getOne = async ({ userId }: UserParameters) => {
	const user = await userRepository.findOne({ id: userId });
	if (user == null) throw new NotFoundError({ message: 'User Not found' });
	return user;
};
