import type { Conversation } from '@repo/contracts/conversations';
import type { Id } from '@repo/contracts/shared';
import type { UserParameters } from '@repo/contracts/users';
import type { RawUserParameters } from '#routes/users/types.ts';

export type ParticipatedConversation = Id & UserParameters;

export type RawParticipatedConversation = Id & RawUserParameters;

export type ConversationParameters = {
	conversationId: Conversation['id'];
};
