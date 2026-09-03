import * as z from 'zod';

import { id } from '#shared/entities.js';

import { GroupUpdate, NewGroup } from './entity.js';

export const GroupParameters = z.object({
	groupId: id,
});

export const CreateGroupBody = NewGroup.omit({ conversationId: true, ownerId: true });

export const UpdateGroupBody = GroupUpdate.omit({ conversationId: true });

export type GroupParameters = z.infer<typeof GroupParameters>;

export type CreateGroupBody = z.infer<typeof CreateGroupBody>;

export type UpdateGroupBody = z.infer<typeof UpdateGroupBody>;
