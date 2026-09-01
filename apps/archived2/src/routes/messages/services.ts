import { parseId } from '#db/helpers.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { destroy, findFirst, update } from './repository.ts';

const getMessage = async (id: number) => {
	const message = await findFirst(id);
	if (message == null) throw new NotFoundError({ message: 'Message Not Found' });
	return message;
};

const getSentMessage = async (id: number, userId: string) => {
	const message = await getMessage(id);
	const senderId = parseId(userId);

	if (message.senderId !== senderId) throw new ForbiddenError();
	return message;
};

export const editMessage = async (messageId: number, userId: string, content: string) => {
	const { id } = await getSentMessage(messageId, userId);
	return await update({ id, content });
};

export const deleteMessage = async (messageId: number, userId: string) => {
	const { id } = await getSentMessage(messageId, userId);
	return await destroy(id);
};
