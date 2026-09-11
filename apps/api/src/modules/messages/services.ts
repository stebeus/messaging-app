import type { MessageParams } from '@repo/contracts/messages';
import type {
	EditManagedMessageArgs,
	EditMessageArgs,
	ListMessageArgs,
	MessageManagement,
	SendMessageArgs,
	SentMessage,
} from './types.ts';

import { memberService } from '#modules/members/services.ts';
import { ForbiddenError, NotFoundError } from '#utils/errors.ts';

import { messageRepository } from './repository.ts';

const send = async ({ conversationId, userId, body }: SendMessageArgs) => {
	await memberService.requireMembership({ conversationId, userId });
	return await messageRepository.create({ ...body, conversationId, senderId: userId });
};

const find = async ({ query, ...params }: ListMessageArgs) => {
	const { conversationId } = await memberService.requireMembership(params);
	return messageRepository.find({ conversationId, query });
};

const getOne = async ({ messageId }: MessageParams) => {
	const message = await messageRepository.findOne({ id: messageId });
	if (message == null) throw new NotFoundError({ resource: 'message' });
	return message;
};

const getOneBySender = async ({ messageId, userId }: SentMessage) => {
	const message = await getOne({ messageId });
	if (message.senderId !== userId) throw new ForbiddenError();
	return message;
};

const edit = async ({ body, ...params }: EditMessageArgs) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.update({ ...body, id });
};

const destroy = async (params: SentMessage) => {
	const { id } = await getOneBySender(params);
	return await messageRepository.destroy({ id });
};

const editWithPermission = async ({ messageId, body, ...params }: EditManagedMessageArgs) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeMemberManagement({ ...params, targetId: senderId });
	return await messageRepository.update({ ...body, id });
};

const destroyWithPermission = async ({ messageId, ...params }: MessageManagement) => {
	const { id, senderId } = await getOne({ messageId });
	await memberService.authorizeMemberManagement({ ...params, targetId: senderId });
	return await messageRepository.destroy({ id });
};

export const messageService = {
	send,
	find,
	edit,
	destroy,
	editWithPermission,
	destroyWithPermission,
} as const;
