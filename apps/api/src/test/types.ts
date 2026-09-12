import type { Ban } from '@repo/contracts/bans';
import type { Conversation } from '@repo/contracts/conversations';
import type { FriendRequest } from '@repo/contracts/friend-requests';
import type { Group } from '@repo/contracts/groups';
import type { Member } from '@repo/contracts/members';
import type { Message } from '@repo/contracts/messages';
import type { Friendship } from '@repo/contracts/relationships/friendships';
import type { User } from '@repo/contracts/users';

export type DateArgs = string | number | Date;

export type TimestampsOptions = Partial<{
	createdAt: DateArgs;
	updatedAt: DateArgs;
}>;

export type UserOptions = Partial<User>;

export type FriendshipOptions = Partial<Friendship>;

export type FriendRequestOptions = Partial<FriendRequest>;

export type ConversationOptions = Partial<Conversation>;

export type GroupOptions = Partial<Group>;

export type BanOptions = Partial<Ban>;

export type MemberOptions = Partial<Member>;

export type MessageOptions = Partial<Message>;
