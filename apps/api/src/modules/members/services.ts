import type {
	GroupMemberParameters,
	Management,
	MemberManagement,
	MemberParameters,
	MemberSearchParameters,
	RoleManagement,
} from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { banRepository, banService } from '#modules/conversations/groups/bans/index.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { canManage, canManageMember } from './helpers.ts';
import { memberRepository } from './repository.ts';

const joinGroup = async ({ userId, groupId }: GroupMemberParameters) => {
	const ban = await banService.getOne({ userId, groupId });
	if (ban != null) throw new ForbiddenError();
	return await memberRepository.create({ userId, conversationId: groupId });
};

const getOne = async ({ groupId, ...params }: DatabaseContext<GroupMemberParameters>) => {
	const member = await memberRepository.findOne({ ...params, conversationId: groupId });
	if (member == null) throw new NotFoundError({ resource: 'Member' });
	return member;
};

const leaveGroup = async (params: GroupMemberParameters) => {
	const { userId, conversationId } = await getOne(params);
	return memberRepository.destroy({ userId, conversationId });
};

const requireMembership = async (params: DatabaseContext<MemberParameters>) => {
	const member = await memberRepository.findOne(params);
	if (member == null) throw new ForbiddenError();
	return member;
};

const search = async ({ userId, groupId, query }: MemberSearchParameters) => {
	const { conversationId } = await requireMembership({ userId, conversationId: groupId });
	return memberRepository.find({ conversationId, query });
};

const authorizeManagement = async ({ actorId, groupId, tx }: DatabaseContext<Management>) => {
	const actor = await requireMembership({ userId: actorId, conversationId: groupId, tx });
	if (!canManage(actor)) throw new ForbiddenError();
	return actor;
};

const authorizeMemberManagement = async ({
	actorId,
	targetId,
	...params
}: DatabaseContext<MemberManagement>) => {
	const actor = await authorizeManagement({ ...params, actorId });
	const target = await getOne({ ...params, userId: targetId });

	if (!canManageMember(actor, target)) throw new ForbiddenError();

	return target;
};

const changeRole = async ({ groupId, role, ...params }: RoleManagement) => {
	const { userId } = await authorizeMemberManagement({ ...params, groupId });
	return await memberRepository.update({ userId, conversationId: groupId, role });
};

const kick = async ({ groupId, tx, ...params }: DatabaseContext<MemberManagement>) => {
	const { userId } = await authorizeMemberManagement({ ...params, groupId, tx });
	return await memberRepository.destroy({ userId, conversationId: groupId, tx });
};

const ban = async (params: MemberManagement) =>
	await db.transaction(async (tx) => {
		const { userId, conversationId } = await kick({ ...params, tx });
		return await banRepository.create({ userId, groupId: conversationId, tx });
	});

const unban = async ({ groupId, actorId, targetId }: MemberManagement) =>
	await db.transaction(async (tx) => {
		await authorizeManagement({ groupId, actorId, tx });
		return await banService.destroy({ groupId, userId: targetId, tx });
	});

export const memberService = {
	joinGroup,
	getOne,
	leaveGroup,
	requireMembership,
	search,
	authorizeMemberManagement,
	changeRole,
	kick,
	ban,
	unban,
} as const;
