import type { MessageParameters } from '@repo/contracts/messages';
import type {
	EditManagedMessageParameters,
	EditMessageParameters,
	MessageManagementParameters,
	SendMessageParameters,
	SentMessage,
} from './types.ts';

import * as memberService from '#modules/members/services.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import * as messageRepository from './repository.ts';

const getOne = async ({ messageId }: MessageParameters) => {
	const message = await messageRepository.findOne({ id: messageId });
	if (message == null) throw new NotFoundError({ resource: 'Message' });
	return message;
};

const getOneBySender = async ({ messageId, userId }: SentMessage) => {
	const message = await getOne({ messageId });
	if (message.senderId !== userId) throw new ForbiddenError();
	return message;
};

export const send = async ({ content, ...params }: SendMessageParameters) => {
	const { conversationId, userId } = await memberService.getOne(params);
	return await messageRepository.create({ conversationId, senderId: userId, content });
};

export const edit = async ({ content, ...params }: EditMessageParameters) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.update({ id, content });
};

export const destroy = async (params: SentMessage) => {
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
