import type { CreateGroupBody, UpdateGroupBody } from '@repo/contracts/groups';
import type { Id } from '@repo/contracts/shared';
import type { RawParticipatedConversation } from '#routes/conversations/types.ts';
import type { RawUserParameters } from '#routes/users/types.ts';

import { db, parseId } from '#db/index.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import * as memberRepository from '#routes/members/repository.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import * as groupRepository from './repository.ts';

type CreateGroupParameters = RawUserParameters & {
	body: CreateGroupBody;
};

type UpdateGroupParameters = RawParticipatedConversation & {
	body: UpdateGroupBody;
};

const getOne = async (params: Id) => {
	const group = await groupRepository.findOne(params);
	if (group == null) throw new NotFoundError({ message: 'Group Not found' });
	return group;
};

const getOneByOwnership = async ({ id, userId }: RawParticipatedConversation) => {
	const group = await getOne({ id });
	const parsedUserId = parseId(userId);

	if (group.ownerId !== parsedUserId) throw new ForbiddenError();

	return group;
};

export const create = async ({ userId, body }: CreateGroupParameters) =>
	await db.transaction(async (client) => {
		const parsedUserId = parseId(userId);

		const { id } = await conversationRepository.create({ type: 'group', client });

		const { userId: ownerId } = await memberRepository.create({
			userId: parsedUserId,
			conversationId: id,
			role: 'owner',
			client,
		});

		return await groupRepository.create({ ...body, conversationId: id, ownerId, client });
	});

export const findByMembership = async ({ userId }: RawUserParameters) => {
	const parsedUserId = parseId(userId);
	return await groupRepository.findByMembership({ userId: parsedUserId });
};

export const getOneByMembership = async ({ id, userId }: RawParticipatedConversation) => {
	const parsedUserId = parseId(userId);
	const group = await groupRepository.findOneByMembership({ id, userId: parsedUserId });

	if (group == null) throw new NotFoundError({ message: 'Group Not found' });

	return group;
};

export const edit = async ({ body, ...params }: UpdateGroupParameters) => {
	const { conversationId, ownerId } = await getOneByOwnership(params);
	return await groupRepository.update({ ...body, conversationId, ownerId });
};

export const destroy = async (params: RawParticipatedConversation) => {
	const { conversationId } = await getOneByOwnership(params);
	return await conversationRepository.destroy({ id: conversationId });
};
