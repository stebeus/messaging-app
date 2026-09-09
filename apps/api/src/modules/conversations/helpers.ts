import type { Id } from '@repo/contracts/shared';

export const conversationRelations = { members: true, messages: true } as const;

export const memberOf = (userId: Id) => ({ members: { userId } }) as const;
