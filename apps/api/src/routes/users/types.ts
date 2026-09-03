import type { UserQuery } from '@repo/contracts/users';
import type { QueryParameters } from '#types.ts';

export type UserId = number | string;

export type RawUserParameters = {
	userId: UserId;
};

export type UserQueryParameters = QueryParameters<UserQuery>;
