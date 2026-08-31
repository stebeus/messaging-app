import * as z from 'zod';

import { id } from '#shared/fields.js';

import { GroupUpdate, NewGroup } from './entity.js';

export const GroupParams = z.object({
	groupId: id,
});

export const CreateGroupBody = NewGroup.omit({ conversationId: true, ownerId: true });

export const UpdateGroupBody = GroupUpdate.omit({ conversationId: true });

export type GroupParams = z.infer<typeof GroupParams>;

export type CreateGroupBody = z.infer<typeof CreateGroupBody>;

export type UpdateGroupBody = z.infer<typeof UpdateGroupBody>;
