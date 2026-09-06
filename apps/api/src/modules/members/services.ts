import type { Member } from '@repo/contracts/members';
import type {
	MemberManagementParameters,
	RawMemberParameters,
	RoleManagementParameters,
} from './types.ts';

import { parseId } from '#db/helpers.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import * as memberRepository from './repository.ts';

const getOne = async ({ userId, groupId }: RawMemberParameters) => {
	const parsedUserId = parseId(userId);
	const member = await memberRepository.findOne({ userId: parsedUserId, conversationId: groupId });

	if (member == null) throw new NotFoundError({ message: 'Member Not Found' });

	return member;
};

const canManage = (actor: Member, target: Member) =>
	actor.role !== 'member' && target.role === 'member';

export const joinGroup = async ({ userId, groupId }: RawMemberParameters) => {
	const parsedUserId = parseId(userId);
	return await memberRepository.create({ userId: parsedUserId, conversationId: groupId });
};

export const authorizeManagement = async ({
	actorId,
	targetId,
	groupId,
}: MemberManagementParameters) => {
	const actor = await getOne({ userId: actorId, groupId });
	const target = await getOne({ userId: targetId, groupId });

	if (!canManage(actor, target)) throw new ForbiddenError();

	return target;
};

export const changeRole = async ({ groupId, role, ...params }: RoleManagementParameters) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.update({ userId, conversationId: groupId, role });
};

export const kick = async ({ groupId, ...params }: MemberManagementParameters) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.update({ userId, conversationId: groupId });
};
