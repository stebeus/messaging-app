import type { RawFriendshipParameters } from './types.ts';

import { parseId } from '#db/helpers.ts';

export const parseFriendshipId = ({ user1Id, user2Id }: RawFriendshipParameters) => {
	const parsedUser1Id = parseId(user1Id);

	const minId = Math.min(parsedUser1Id, user2Id);
	const maxId = Math.max(parsedUser1Id, user2Id);

	return { user1Id: minId, user2Id: maxId } as const;
};
