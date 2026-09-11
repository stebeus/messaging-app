import * as z from 'zod';

import { Relationship } from '#modules/relationships/entity.js';
import { createdAt } from '#shared/entities.js';

export const Friendship = z.object({
	...Relationship.shape,
	createdAt,
});

export const NewFriendship = Friendship.omit({ createdAt: true });

export type Friendship = z.infer<typeof Friendship>;

export type NewFriendship = z.infer<typeof NewFriendship>;
