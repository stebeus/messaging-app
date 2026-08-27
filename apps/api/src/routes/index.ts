import { Router } from 'express';

import { authenticate } from '#middleware/auth.ts';

import { conversations } from './conversations/index.ts';
import { users } from './users/index.ts';

export const routes = Router();

routes.use(authenticate);

routes.use('/conversations', conversations);
routes.use('/users', users);
