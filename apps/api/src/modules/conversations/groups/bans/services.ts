import type { DatabaseContext } from '#db/types.ts';
import type { BanParameters } from './types.ts';

import { NotFoundError } from '#utils/errors.ts';

import { banRepository } from './repository.ts';

const getOne = async (params: DatabaseContext<BanParameters>) => {
	const ban = await banRepository.findOne(params);
	if (ban == null) throw new NotFoundError({ resource: 'Ban' });
	return ban;
};

const destroy = async ({ tx, ...params }: DatabaseContext<BanParameters>) => {
	const ban = await getOne({ ...params, tx });
	return await banRepository.destroy({ ...ban, tx });
};

export const banService = { getOne, destroy } as const;
