import type { DatabaseContext } from '#db/types.ts';
import type { BanParameters } from './types.ts';

import { NotFoundError } from '#utils/errors.ts';

import * as banRepository from './repository.ts';

export const getOne = async (params: DatabaseContext<BanParameters>) => {
	const ban = await banRepository.findOne(params);
	if (ban == null) throw new NotFoundError({ resource: 'Ban' });
	return ban;
};

export const destroy = async ({ tx, ...params }: DatabaseContext<BanParameters>) => {
	const ban = await getOne({ ...params, tx });
	return await banRepository.destroy({ ...ban, tx });
};
