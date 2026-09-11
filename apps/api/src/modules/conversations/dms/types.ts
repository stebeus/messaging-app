import type { DirectMessageParams } from '@repo/contracts/conversations';
import type { UserParams } from '@repo/contracts/users';

export type DirectMessageMember = DirectMessageParams & UserParams;
