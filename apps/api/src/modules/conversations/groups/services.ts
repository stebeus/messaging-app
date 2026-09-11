import type { GroupParams } from '@repo/contracts/groups';
import type { ListBanArgs } from './bans/types.ts';
import type { CreateGroupArgs, EditGroupArgs } from './types.ts';

import { db } from '#db/client.ts';
import { conversationRepository } from '#modules/conversations/repository.ts';
import { type GroupMember, memberRepository, memberService } from '#modules/members/index.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { banRepository } from './bans/repository.ts';
import { groupRepository } from './repository.ts';

const create = async ({ userId, body }: CreateGroupArgs) =>
	await db.transaction(async (tx) => {
		const { id } = await conversationRepository.create({ type: 'group', tx });

		const { userId: ownerId } = await memberRepository.create({
			userId,
			conversationId: id,
			role: 'owner',
			tx,
		});

		return await groupRepository.create({ ...body, conversationId: id, ownerId, tx });
	});

const getOne = async ({ groupId }: GroupParams) => {
	const group = await groupRepository.findOne({ conversationId: groupId });
	if (group == null) throw new NotFoundError({ resource: 'group' });
	return group;
};

const getOneByOwnership = async ({ groupId, userId }: GroupMember) => {
	const group = await getOne({ groupId });
	if (group.ownerId !== userId) throw new ForbiddenError();
	return group;
};

const edit = async ({ body, ...params }: EditGroupArgs) => {
	const { conversationId, ownerId } = await getOneByOwnership(params);
	return await groupRepository.update({ ...body, conversationId, ownerId });
};

const destroy = async (params: GroupMember) => {
	const { conversationId } = await getOneByOwnership(params);
	return await conversationRepository.destroy({ id: conversationId });
};

const findBans = async ({ userId, groupId, query }: ListBanArgs) => {
	const { conversationId } = await memberService.requireMembership({
		userId,
		conversationId: groupId,
	});

	return banRepository.find({ groupId: conversationId, query });
};

export const groupService = { create, edit, destroy, findBans } as const;
