import type { Id } from '@repo/contracts/shared';

import { containsDisplayName } from '#modules/users/helpers.ts';

export const filterUser = (user1Id: Id, user2Id: Id, displayName?: string) => ({
	where: { ...containsDisplayName(displayName), NOT: { OR: [{ id: user1Id }, { id: user2Id }] } },
});
