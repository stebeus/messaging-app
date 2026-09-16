import * as z from 'zod';

import { Conversation } from '#modules/conversations/entity.js';
import { MessageParams } from '#modules/messages/dto.js';
import { User } from '#modules/users/entity.js';
import { id } from '#shared/entities.js';

import { Group, GroupUpdate, NewGroup } from './entity.js';

export const GroupParams = z.object({
	groupId: id,
});

export const GroupMessageParams = z.object({
	...MessageParams.shape,
	...GroupParams.shape,
});

export const CreateGroupBodyRequest = NewGroup.omit({ conversationId: true, ownerId: true });

export const UpdateGroupBodyRequest = GroupUpdate.omit({ conversationId: true });

export const GroupResponse = z.object({
	...Group.shape,
	conversation: Conversation,
	owner: User,
});

export const ListGroupResponse = z.array(GroupResponse);

export type GroupParams = z.infer<typeof GroupParams>;

export type GroupMessageParams = z.infer<typeof GroupMessageParams>;

export type CreateGroupBodyRequest = z.input<typeof CreateGroupBodyRequest>;

export type UpdateGroupBodyRequest = z.infer<typeof UpdateGroupBodyRequest>;

export type GroupResponse = z.infer<typeof GroupResponse>;

export type ListGroupResponse = z.infer<typeof ListGroupResponse>;
