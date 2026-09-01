import { conversationRelations, memberOf } from '#routes/conversations/helpers.ts';

export const groupRelations = {
	conversation: { with: conversationRelations },
	owner: true,
} as const;

export const groupSearchRelations = {
	conversation: { with: { members: true } },
	owner: true,
} as const;

export const memberOfGroup = (userId: string) =>
	({ conversation: { ...memberOf(userId) } }) as const;
