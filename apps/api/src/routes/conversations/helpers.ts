export const conversationRelations = { members: true, messages: true } as const;

export const memberOf = (userId: number) => ({ members: { userId } }) as const;
