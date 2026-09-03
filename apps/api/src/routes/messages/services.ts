import type { MessageParameters } from '@repo/contracts/messages';
import type {
	EditManagedMessageParameters,
	EditSentMessageParameters,
	MessageManagementParameters,
	SendMessageParameters,
	SentMessageParameters,
} from './types.ts';

import { parseId } from '#db/helpers.ts';
import * as memberService from '#routes/members/services.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import * as messageRepository from './repository.ts';

export const getOne = async ({ messageId }: MessageParameters) => {
	const message = await messageRepository.findOne({ id: messageId });
	if (message == null) throw new NotFoundError({ message: 'Message Not Found' });
	return message;
};

const getOneBySender = async ({ messageId, userId }: SentMessageParameters) => {
	const message = await getOne({ messageId });
	const parsedUserId = parseId(userId);

	if (message.senderId !== parsedUserId) throw new ForbiddenError();

	return message;
};

export const send = async ({ conversationId, userId, content }: SendMessageParameters) => {
	const parsedUserId = parseId(userId);
	return await messageRepository.create({ conversationId, senderId: parsedUserId, content });
};

export const edit = async ({ content, ...params }: EditSentMessageParameters) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.update({ id, content });
};

export const destroy = async (params: SentMessageParameters) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.destroy({ id });
};

export const editWithPermission = async ({
	messageId,
	content,
	...params
}: EditManagedMessageParameters) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeManagement({ ...params, targetId: senderId });
	return await messageRepository.update({ id, content });
};

export const destroyWithPermission = async ({
	messageId,
	...params
}: MessageManagementParameters) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeManagement({ ...params, targetId: senderId });
	return await messageRepository.destroy({ id });
};
