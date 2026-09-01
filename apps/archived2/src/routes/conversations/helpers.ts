import { parseId } from '#db/helpers.ts';

export const conversationRelations = { members: true, messages: true } as const;

export const memberOf = (userId: string) => ({ members: { userId: parseId(userId) } }) as const;
