import type {
	MemberManagementParameters,
	MemberParameters,
	RoleManagementParameters,
} from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import * as banRepository from '#modules/conversations/groups/bans/repository.ts';
import * as banService from '#modules/conversations/groups/bans/services.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { canManage } from './helpers.ts';
import * as memberRepository from './repository.ts';

export const joinGroup = async ({ userId, conversationId }: MemberParameters) => {
	const ban = await banService.getOne({ userId, groupId: conversationId });
	if (ban != null) throw new ForbiddenError();
	return await memberRepository.create({ userId, conversationId });
};

export const getOne = async (params: DatabaseContext<MemberParameters>) => {
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

export const changeRole = async ({ groupId, role, ...params }: RoleManagementParameters) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.update({ userId, conversationId: groupId, role });
};

export const kick = async ({ groupId, ...params }: DatabaseContext<MemberManagementParameters>) => {
	const { userId } = await authorizeManagement({ ...params, groupId });
	return await memberRepository.destroy({ userId, conversationId: groupId });
};

export const ban = async ({
	groupId,
	tx,
	...params
}: DatabaseContext<MemberManagementParameters>) =>
	await db.transaction(async (tx) => {
		const { userId, conversationId } = await kick({ ...params, groupId, tx });
		return await banRepository.create({ userId, groupId: conversationId, tx });
	});

export const unban = async ({ tx, ...params }: DatabaseContext<MemberManagementParameters>) =>
	await db.transaction(async (tx) => {
		const { userId, conversationId } = await authorizeManagement({ ...params, tx });
		return await banService.destroy({ userId, groupId: conversationId, tx });
	});
