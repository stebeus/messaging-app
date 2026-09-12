import type { Id } from '@repo/contracts/shared';

import { contains } from '#db/helpers.ts';
import { conversationRelations, memberOf } from '#modules/conversations/helpers.ts';

type GroupRelations = Partial<{
	members: true;
	messages: true;
}>;

const createGroupRelations = (relations: GroupRelations) =>
	({ conversation: { with: relations }, owner: true }) as const;

export const groupRelations = createGroupRelations(conversationRelations);

export const groupListRelations = createGroupRelations({ members: true });

export const containsName = (name?: string) =>
	name == null ? undefined : ({ name: contains(name) } as const);

export const memberOfGroup = (userId: Id) => ({ conversation: { ...memberOf(userId) } }) as const;
