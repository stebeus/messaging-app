import type { MessageParameters } from '@repo/contracts/messages';
import type {
	EditManagedMessageParameters,
	EditMessageParameters,
	MessageManagement,
	SendMessageParameters,
	SentMessage,
} from './types.ts';

import { memberService } from '#modules/members/services.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { messageRepository } from './repository.ts';

const send = async ({ content, ...params }: SendMessageParameters) => {
	const { conversationId, userId } = await memberService.requireMembership(params);
	return await messageRepository.create({ conversationId, senderId: userId, content });
};

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

const edit = async ({ content, ...params }: EditMessageParameters) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.update({ id, content });
};

const destroy = async (params: SentMessage) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.destroy({ id });
};

const editWithPermission = async ({
	messageId,
	content,
	...params
}: EditManagedMessageParameters) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeMemberManagement({ ...params, targetId: senderId });
	return await messageRepository.update({ id, content });
};

const destroyWithPermission = async ({ messageId, ...params }: MessageManagement) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeMemberManagement({ ...params, targetId: senderId });
	return await messageRepository.destroy({ id });
};

export const messageService = {
	send,
	edit,
	destroy,
	editWithPermission,
	destroyWithPermission,
} as const;
