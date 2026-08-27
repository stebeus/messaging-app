import type z from 'zod';

import { NewGroup } from './entity.js';

export const GroupBody = NewGroup.omit({ conversationId: true });

export type GroupBody = z.infer<typeof GroupBody>;
