import { NotFoundError } from '#utils/errors.ts';

import { findFirst } from './repository.ts';

export const getUser = async (id: number) => {
	const user = await findFirst(id);
	if (user == null) throw new NotFoundError({ message: 'User Not found' });
	return user;
};
