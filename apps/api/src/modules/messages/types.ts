import type { ConversationParams } from '@repo/contracts/conversations';
import type {
	CreateMessageBodyRequest,
	Message,
	MessageParams,
	UpdateMessageBodyRequest,
} from '@repo/contracts/messages';
import type { UserParams } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { Management, MemberArgs } from '#modules/members/types.ts';
import type { BodyDto, QueryDto } from '#types.ts';

type UpdateMessageDto = BodyDto<UpdateMessageBodyRequest>;

export type MessagesSelection = ConversationParams & QueryDto;

export type MessageSelection = Selection<Message>;

export type ListMessageArgs = MemberArgs & QueryDto;

export type SendMessageArgs = MemberArgs & BodyDto<CreateMessageBodyRequest>;

export type SentMessage = UserParams & MessageParams;

export type EditMessageArgs = SentMessage & UpdateMessageDto;

export type MessageManagement = Management & MessageParams;

export type EditManagedMessageArgs = MessageManagement & UpdateMessageDto;
