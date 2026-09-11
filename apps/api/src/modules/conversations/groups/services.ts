import type { GroupParams } from '@repo/contracts/groups';
import type { CreateGroupArgs, EditGroupArgs } from './types.ts';

import { db } from '#db/client.ts';
import { conversationRepository } from '#modules/conversations/repository.ts';
import { type GroupMember, memberRepository } from '#modules/members/index.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

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

export const groupService = { create, edit, destroy } as const;
