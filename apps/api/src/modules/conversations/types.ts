import type { Conversation } from '@repo/contracts/conversations';
import type { UserParams } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';

export type ConversationSelection = Selection<Conversation>;

export type ConversationMember = Pick<Conversation, 'id'> & UserParams;
