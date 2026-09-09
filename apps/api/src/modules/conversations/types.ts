import type { Conversation, NewConversation } from '@repo/contracts/conversations';
import type { NewMember } from '@repo/contracts/members';
import type { Selection } from '#db/types.ts';

export type ConversationSelection = Selection<Conversation>;

export type CreateConversationParameters = NewConversation & {
	members: NewMember[];
};
