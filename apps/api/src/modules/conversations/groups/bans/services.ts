import type { DatabaseContext } from '#db/types.ts';
import type { GroupMember } from '#modules/members/types.ts';

import { NotFoundError } from '#utils/errors.ts';

import { banRepository } from './repository.ts';

const getOne = async (params: DatabaseContext<GroupMember>) => {
	const ban = await banRepository.findOne(params);
	if (ban == null) throw new NotFoundError({ resource: 'ban' });
	return ban;
};

const destroy = async ({ tx, ...params }: DatabaseContext<GroupMember>) => {
	const { userId, groupId } = await getOne({ ...params, tx });
	return await banRepository.destroy({ userId, groupId, tx });
};

export const banService = { getOne, destroy } as const;
