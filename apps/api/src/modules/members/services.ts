import type { DatabaseContext } from '#db/types.ts';
import type {
	MemberManagementParameters,
	MemberParameters,
	RoleManagementParameters,
} from './types.ts';

import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { canManage } from './helpers.ts';
import * as memberRepository from './repository.ts';

const getOne = async (params: DatabaseContext<MemberParameters>) => {
	const member = await memberRepository.findOne(params);
	if (member == null) throw new NotFoundError({ resource: 'Member' });
	return member;
};

export const authorizeManagement = async ({
	actorId,
	targetId,
	groupId,
	tx,
}: DatabaseContext<MemberManagementParameters>) => {
	const actor = await getOne({ userId: actorId, conversationId: groupId, tx });
	const target = await getOne({ userId: targetId, conversationId: groupId, tx });

	if (!canManage(actor, target)) throw new ForbiddenError();

	return target;
};

export const changeRole = async ({
	groupId,
	role,
	...params
}: DatabaseContext<RoleManagementParameters>) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.update({ userId, conversationId: groupId, role });
};

export const kick = async ({ groupId, ...params }: DatabaseContext<MemberManagementParameters>) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.destroy({ userId, conversationId: groupId });
};
