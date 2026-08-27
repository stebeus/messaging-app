import { Router } from 'express';

import { authorize } from '#middleware/auth.ts';

import { conversations } from './conversations/index.ts';
import { users } from './users/index.ts';

export const routes = Router();

routes.use(authorize);

routes.use('/conversations', conversations);
routes.use('/users', users);
