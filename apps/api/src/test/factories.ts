import type {
	BanOptions,
	ConversationOptions,
	DateArgs,
	FriendRequestOptions,
	FriendshipOptions,
	GroupOptions,
	MemberOptions,
	MessageOptions,
	TimestampsOptions,
	UserOptions,
} from './types.ts';

import { Conversation } from '@repo/contracts/conversations';
import { Group } from '@repo/contracts/groups';
import { Member } from '@repo/contracts/members';

const defaultId = '1';
const defaultId2 = '2';

const { defaultValue: defaultType } = Conversation.shape.type.def;
const { defaultValue: defaultVisibility } = Group.shape.visibility.def;
const { defaultValue: defaultRole } = Member.shape.role.def;

export const createTimestamp = (timestamp: DateArgs = '2001-01-01T00:00:00') => new Date(timestamp);

export const createTimestamps = ({ createdAt, updatedAt }: TimestampsOptions) =>
	({ createdAt: createTimestamp(createdAt), updatedAt: createTimestamp(updatedAt) }) as const;

export const createUser = ({
	id = defaultId,
	name = 'John Doe',
	username = 'john_doe',
	displayName = 'john_doe',
	email = 'john_doe@email.com',
	emailIsVerified = false,
	avatar = '',
	...timestamps
}: UserOptions = {}) =>
	({
		...createTimestamps(timestamps),
		id,
		name,
		username,
		displayName,
		email,
		emailIsVerified,
		avatar,
	}) as const;

export const createFriendship = ({
	user1Id = defaultId,
	user2Id = defaultId2,
	createdAt,
}: FriendshipOptions = {}) =>
	({ user1Id, user2Id, createdAt: createTimestamp(createdAt) }) as const;

export const createFriendRequest = ({
	requesterId = defaultId,
	recipientId = defaultId2,
	createdAt,
}: FriendRequestOptions = {}) =>
	({ requesterId, recipientId, createdAt: createTimestamp(createdAt) }) as const;

export const createConversation = ({
	id = defaultId,
	type = defaultType,
	createdAt,
}: ConversationOptions = {}) => ({ id, type, createdAt: createTimestamp(createdAt) }) as const;

export const createGroup = ({
	conversationId = defaultId,
	ownerId = defaultId,
	name = 'Group',
	description = '',
	avatar = '',
	visibility = defaultVisibility,
	...timestamps
}: GroupOptions = {}) =>
	({
		...createTimestamps(timestamps),
		conversationId,
		ownerId,
		name,
		description,
		avatar,
		visibility,
	}) as const as Group;

export const createBan = ({
	userId = defaultId2,
	groupId = defaultId,
	...timestamps
}: BanOptions = {}) => ({ ...createTimestamps(timestamps), userId, groupId }) as const;

export const createMember = ({
	userId = defaultId,
	conversationId = defaultId,
	role = defaultRole,
	...timestamps
}: MemberOptions = {}) =>
	({ ...createTimestamps(timestamps), userId, conversationId, role }) as const;

export const createMessage = ({
	id = defaultId,
	conversationId = defaultId,
	senderId = defaultId,
	content = 'Hello, world!',
	...timestamps
}: MessageOptions = {}) =>
	({ ...createTimestamps(timestamps), id, conversationId, senderId, content }) as const;
