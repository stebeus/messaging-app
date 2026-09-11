import type { ConversationParams } from '@repo/contracts/conversations';
import type {
	CreateMessageBody,
	Message,
	MessageParams,
	UpdateMessageBody,
} from '@repo/contracts/messages';
import type { UserParams } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { Management, MemberArgs } from '#modules/members/types.ts';
import type { BodyDto, QueryDto } from '#types.ts';

type UpdateMessageDto = BodyDto<UpdateMessageBody>;

export type MessagesSelection = ConversationParams & QueryDto;

export type MessageSelection = Selection<Message>;

export type ListMessageArgs = MemberArgs & QueryDto;

export type SendMessageArgs = MemberArgs & BodyDto<CreateMessageBody>;

export type SentMessage = UserParams & MessageParams;

export type EditMessageArgs = SentMessage & UpdateMessageDto;

export type MessageManagement = Management & MessageParams;

export type EditManagedMessageArgs = MessageManagement & UpdateMessageDto;
