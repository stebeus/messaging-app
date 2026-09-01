import type { CreateGroupBody, UpdateGroupBody } from '@repo/contracts/groups';

import { parseId } from '#db/helpers.ts';
import * as conversationRepository from '#routes/conversations/repository.ts';
import * as memberRepository from '#routes/members/repository.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { create, findFirst, findFirstJoined, update } from './repository.ts';

const getGroup = async (id: number) => {
	const group = await findFirst(id);
	if (group == null) throw new NotFoundError({ message: 'Group Not found' });
	return group;
};

const getOwnedGroup = async (id: number, userId: string) => {
	const group = await getGroup(id);
	const ownerId = parseId(userId);

	if (group.ownerId !== ownerId) throw new ForbiddenError();
	return group;
};

export const createGroup = async (userId: string, body: CreateGroupBody) => {
	const ownerId = parseId(userId);
	const { id } = await conversationRepository.create({ type: 'group' });

	await memberRepository.create({ userId: ownerId, conversationId: id, role: 'owner' });

	return await create({ ...body, conversationId: id, ownerId });
};

export const getJoinedGroup = async (id: number, userId: string) => {
	const group = await findFirstJoined(id, userId);
	if (group == null) throw new NotFoundError({ message: 'Group Not found' });
	return group;
};

export const editGroup = async (id: number, userId: string, body: UpdateGroupBody) => {
	const { conversationId, ownerId } = await getOwnedGroup(id, userId);
	return await update({ ...body, conversationId, ownerId });
};

export const deleteGroup = async (id: number, userId: string) => {
	const { conversationId } = await getOwnedGroup(id, userId);
	return await conversationRepository.destroy(conversationId);
};
