import type { CreateGroupBody } from '@repo/contracts/conversations/groups';

import * as conversationRepository from '#middleware/help/conversations/repository.ts';

import { create } from './repository.ts';

export const createGroup = async (ownerId: string, group: CreateGroupBody) => {
	const { id } = await conversationRepository.create({ type: 'group' });
	return await create({ conversationId: id, ownerId: Number(ownerId), ...group });
};
