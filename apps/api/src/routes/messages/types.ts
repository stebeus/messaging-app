import type {
	CreateMessageBody,
	MessageParameters,
	UpdateMessageBody,
} from '@repo/contracts/messages';
import type { ConversationParameters } from '#routes/conversations/types.ts';
import type { ManagementParameters } from '#routes/members/types.ts';
import type { RawUserParameters } from '#routes/users/types.ts';

export type SentMessageParameters = RawUserParameters & MessageParameters;

export type SendMessageParameters = ConversationParameters & RawUserParameters & CreateMessageBody;

export type EditSentMessageParameters = SentMessageParameters & UpdateMessageBody;

export type MessageManagementParameters = ManagementParameters & MessageParameters;

export type EditManagedMessageParameters = MessageManagementParameters & UpdateMessageBody;
