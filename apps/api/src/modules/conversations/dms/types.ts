import type { DirectMessageParameters } from '@repo/contracts/conversations';
import type { UserParameters } from '@repo/contracts/users';

export type ParticipatedDirectMessage = DirectMessageParameters & UserParameters;
