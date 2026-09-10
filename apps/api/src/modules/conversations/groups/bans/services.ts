import type { DatabaseContext } from '#db/types.ts';
import type { BanParameters } from './types.ts';

import { type MemberSearchParameters, memberService } from '#modules/members/index.ts';
import { NotFoundError } from '#utils/errors.ts';

import { banRepository } from './repository.ts';

const find = async ({ userId, groupId, query }: MemberSearchParameters) => {
	await memberService.requireMembership({ userId, conversationId: groupId });
	return banRepository.find({ groupId, query });
};

const getOne = async (params: DatabaseContext<BanParameters>) => {
	const ban = await banRepository.findOne(params);
	if (ban == null) throw new NotFoundError({ resource: 'Ban' });
	return ban;
};

const destroy = async ({ tx, ...params }: DatabaseContext<BanParameters>) => {
	const ban = await getOne({ ...params, tx });
	return await banRepository.destroy({ ...ban, tx });
};

export const banService = { find, getOne, destroy } as const;
