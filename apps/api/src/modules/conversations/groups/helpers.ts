import type { Id } from '@repo/contracts/shared';

import { contains } from '#db/helpers.ts';
import { conversationRelations, memberOf } from '#modules/conversations/helpers.ts';

type GroupRelationOptions = Partial<{
	members: true;
	messages: true;
}>;

const createGroupRelations = (options: GroupRelationOptions) =>
	({ conversation: { with: options }, owner: true }) as const;

export const groupRelations = createGroupRelations(conversationRelations);

export const groupSearchRelations = createGroupRelations({ members: true });

export const containsName = (name?: string) => ({ name: contains(name) }) as const;

export const memberOfGroup = (userId: Id) => ({ conversation: { ...memberOf(userId) } }) as const;
