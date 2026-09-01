import { parseId } from '#db/helpers.ts';

export const parseFriendshipId = (receiverId: string, senderId: string) => {
	const parsedReceiverId = parseId(receiverId);
	const parsedSenderId = parseId(senderId);

	const userAId = Math.min(parsedReceiverId, parsedSenderId);
	const userBId = Math.max(parsedReceiverId, parsedSenderId);

	return { userAId, userBId };
};
