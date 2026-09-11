import * as z from 'zod';

import { MessageParams } from '#modules/messages/dto.js';
import { id } from '#shared/entities.js';

import { GroupUpdate, NewGroup } from './entity.js';

export const GroupParams = z.object({
	groupId: id,
});

export const GroupMessageParams = z.object({
	...MessageParams.shape,
	...GroupParams.shape,
});

export const CreateGroupBody = NewGroup.omit({ conversationId: true, ownerId: true });

export const UpdateGroupBody = GroupUpdate.omit({ conversationId: true });

export type GroupParams = z.infer<typeof GroupParams>;

export type GroupMessageParams = z.infer<typeof GroupMessageParams>;

export type CreateGroupBody = z.input<typeof CreateGroupBody>;

export type UpdateGroupBody = z.infer<typeof UpdateGroupBody>;
