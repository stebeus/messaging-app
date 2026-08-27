import { Router } from 'express';

import { conversations } from './conversations/index.ts';
import { users } from './users/index.ts';

export const routes = Router();

routes.use('/conversations', conversations);
routes.use('/users', users);
