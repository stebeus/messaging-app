import type { Query } from '@repo/contracts/shared';
import type { User, UserParameters, UserQuery } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { QueryParameters, ScopedQueryParameters } from '#types.ts';

export type UsersSelection = QueryParameters<UserQuery>;

export type UserSelection = Selection<User>;

export type UserScopedQueryParameters<QueryDto = Query> = ScopedQueryParameters<
	UserParameters,
	QueryDto
>;

export type UserSearchParameters = UserScopedQueryParameters<UserQuery>;
