import type { User, UserQuery } from '@repo/contracts/users';
import type { Selection } from '#db/types.ts';
import type { QueryParameters } from '#types.ts';

export type UsersSelection = QueryParameters<UserQuery>;

export type UserSelection = Selection<User>;
