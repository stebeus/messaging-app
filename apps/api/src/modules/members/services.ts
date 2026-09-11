import type {
	GroupMember,
	ListMemberArgs,
	Management,
	MemberArgs,
	MemberManagement,
	RoleManagement,
} from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { banRepository, banService } from '#modules/conversations/groups/bans/index.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { canManage, canManageMember } from './helpers.ts';
import { memberRepository } from './repository.ts';

const joinGroup = async ({ userId, groupId }: GroupMember) => {
	const ban = await banRepository.findOne({ userId, groupId });
	if (ban != null) throw new ForbiddenError({ message: 'You have been banned from this group' });
	return await memberRepository.create({ userId, conversationId: groupId });
};

const getOne = async ({ groupId, ...params }: DatabaseContext<GroupMember>) => {
	const member = await memberRepository.findOne({ ...params, conversationId: groupId });
	if (member == null) throw new NotFoundError({ resource: 'member' });
	return member;
};

const leaveGroup = async (params: GroupMember) => {
	const { userId, conversationId, role } = await getOne(params);
	if (role === 'owner') throw new ForbiddenError();
	return memberRepository.destroy({ userId, conversationId });
};

const requireMembership = async (params: DatabaseContext<MemberArgs>) => {
	const member = await memberRepository.findOne(params);
	if (member == null) throw new ForbiddenError();
	return member;
};

const find = async ({ userId, groupId, query }: ListMemberArgs) => {
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

const changeRole = async ({ groupId, body, ...params }: RoleManagement) => {
	const { userId } = await authorizeMemberManagement({ ...params, groupId });
	return await memberRepository.update({ ...body, userId, conversationId: groupId });
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
		const { conversationId } = await authorizeManagement({ groupId, actorId, tx });
		return await banService.destroy({ groupId: conversationId, userId: targetId, tx });
	});

export const memberService = {
	joinGroup,
	leaveGroup,
	find,
	getOne,
	requireMembership,
	authorizeMemberManagement,
	changeRole,
	kick,
	ban,
	unban,
} as const;
