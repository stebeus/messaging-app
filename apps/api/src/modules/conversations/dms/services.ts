import type { Id } from '@repo/contracts/shared';
import type { FriendshipParameters } from '#modules/relationships/friendships/types.ts';
import type { ParticipatedDirectMessage } from './types.ts';

import { type DatabaseContext, db } from '#db/index.ts';
import { conversationRepository } from '#modules/conversations/repository.ts';
import { memberRepository } from '#modules/members/repository.ts';
import { orderFriendshipIds } from '#modules/relationships/friendships/helpers.ts';
import { NotFoundError } from '#utils/errors.ts';

import { dmRepository } from './repository.ts';

const getOneByFriendship = async ({ tx, ...friendship }: DatabaseContext<FriendshipParameters>) => {
	const friendshipId = orderFriendshipIds(friendship);
	const dm = await dmRepository.findOneByFriendship({ ...friendshipId, tx });

	if (dm == null) throw new NotFoundError({ resource: 'Friend Direct Message' });

	return dm;
};

const create = async ({ tx = db, ...params }: DatabaseContext<FriendshipParameters>) =>
	await tx.transaction(async (tx) => {
		const dm = await conversationRepository.create({ tx });

		const createMember = async (userId: Id) =>
			await memberRepository.create({ userId, conversationId: dm.id });

		const members = await Promise.all(Object.values(params).map(createMember));

		return { ...dm, members } as const;
	});

const getOne = async ({ dmId, userId }: ParticipatedDirectMessage) => {
	const dm = await dmRepository.findOne({ id: dmId, userId });
	if (dm == null) throw new NotFoundError({ resource: 'Direct Message' });
	return dm;
};

const destroyByFriendship = async ({ tx, ...params }: DatabaseContext<FriendshipParameters>) => {
	const { id } = await getOneByFriendship({ ...params, tx });
	return conversationRepository.destroy({ id, tx });
};

export const dmService = { create, getOne, destroyByFriendship } as const;
