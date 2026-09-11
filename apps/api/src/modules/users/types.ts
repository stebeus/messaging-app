import type { User, UserParams, UserQuery } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { QueryDto } from '#types.ts';

export type UsersSelection = QueryDto<UserQuery>;

export type UserSelection = Selection<User>;

export type ListUserArgs = UserParams & UsersSelection;
