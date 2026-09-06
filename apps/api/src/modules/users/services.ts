import type { UserParameters } from '@repo/contracts/users';
import type { DatabaseContext } from '#db/types.ts';

import { NotFoundError } from '#utils/errors.ts';

import * as userRepository from './repository.ts';

export const getOne = async ({ userId, tx }: DatabaseContext<UserParameters>) => {
	const user = await userRepository.findOne({ id: userId, tx });
	if (user == null) throw new NotFoundError({ resource: 'User' });
	return user;
};
