import type { ConversationParameters } from '@repo/contracts/conversations';
import type {
	CreateMessageBody,
	Message,
	MessageParameters,
	UpdateMessageBody,
} from '@repo/contracts/messages';
import type { UserParameters } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { Management, MemberParameters } from '#modules/members/types.ts';
import type { QueryParameters, ScopedQueryParameters } from '#types.ts';

export type MessagesSelection = ConversationParameters & QueryParameters;

export type MessageSelection = Selection<Message>;

export type MessageSearchParameters = ScopedQueryParameters<MemberParameters>;

export type SentMessage = UserParameters & MessageParameters;

export type SendMessageParameters = ConversationParameters & UserParameters & CreateMessageBody;

export type EditMessageParameters = SentMessage & UpdateMessageBody;

export type MessageManagement = Management & MessageParameters;

export type EditManagedMessageParameters = MessageManagement & UpdateMessageBody;
