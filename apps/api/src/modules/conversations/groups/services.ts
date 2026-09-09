import type { GroupParameters } from '@repo/contracts/groups';
import type { CreateGroupParameters, EditGroupParameters, ParticipatedGroup } from './types.ts';

import { db } from '#db/client.ts';
import * as conversationRepository from '#modules/conversations/repository.ts';
import * as memberRepository from '#modules/members/repository.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import * as groupRepository from './repository.ts';

const getOne = async ({ groupId }: GroupParameters) => {
	const group = await groupRepository.findOne({ conversationId: groupId });
	if (group == null) throw new NotFoundError({ resource: 'Group' });
	return group;
};

const getOneByOwnership = async ({ groupId, userId }: ParticipatedGroup) => {
	const group = await getOne({ groupId });
	if (group.ownerId !== userId) throw new ForbiddenError();
	return group;
};

export const create = async ({ userId, body }: CreateGroupParameters) =>
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

export const getOneByMembership = async (params: ParticipatedGroup) => {
	const group = await groupRepository.findOneByMembership(params);
	if (group == null) throw new NotFoundError({ resource: 'Joined Group' });
	return group;
};

export const edit = async ({ body, ...params }: EditGroupParameters) => {
	const { conversationId, ownerId } = await getOneByOwnership(params);
	return await groupRepository.update({ ...body, conversationId, ownerId });
};

export const destroy = async (params: ParticipatedGroup) => {
	const { conversationId } = await getOneByOwnership(params);
	return await conversationRepository.destroy({ id: conversationId });
};
