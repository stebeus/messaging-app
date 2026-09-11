import type { Relationship } from '@repo/contracts/relationships';
import type { Id } from '@repo/contracts/shared';
import type { DatabaseContext } from '#db/types.ts';
import type { DirectMessageMember } from './types.ts';

import { conversationRepository } from '#modules/conversations/repository.ts';
import { memberRepository } from '#modules/members/repository.ts';
import { NotFoundError } from '#utils/errors.ts';

import { dmRepository } from './repository.ts';

const create = async ({ tx, ...params }: DatabaseContext<Relationship>) => {
	const dm = await conversationRepository.create({ tx });

	const createMember = async (userId: Id) =>
		await memberRepository.create({ userId, conversationId: dm.id, tx });

	const members = await Promise.all(Object.values(params).map(createMember));

	return { ...dm, members } as const;
};

const getOne = async ({ dmId, userId }: DirectMessageMember) => {
	const dm = await dmRepository.findOne({ id: dmId, userId });
	if (dm == null) throw new NotFoundError({ resource: 'direct message' });
	return dm;
};

const getOneByFriendship = async (params: DatabaseContext<Relationship>) => {
	const dm = await dmRepository.findOneByFriendship(params);
	if (dm == null) throw new NotFoundError({ resource: 'friend direct message' });
	return dm;
};

const destroyByFriendship = async ({ tx, ...params }: DatabaseContext<Relationship>) => {
	const { id } = await getOneByFriendship({ ...params, tx });
	return conversationRepository.destroy({ id, tx });
};

export const dmService = { create, getOne, destroyByFriendship } as const;
