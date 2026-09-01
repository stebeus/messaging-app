import { parseFriendshipId } from '#routes/friendships/helpers.ts';
import { NotFoundError } from '#utils/errors.ts';

import { findFirst, findFirstWithFriend } from './repository.ts';

export const getDm = async (id: number, userId: string) => {
	const dm = await findFirst(id, userId);
	if (dm == null) throw new NotFoundError({ message: 'Direct Message Not Found' });
	return dm;
};

export const getFriendDm = async (receiverId: string, senderId: string) => {
	const { userAId, userBId } = await parseFriendshipId(receiverId, senderId);
	const dm = await findFirstWithFriend(userAId, userBId);

	if (dm == null) throw new NotFoundError({ message: 'Direct Message Not Found' });
	return dm;
};
