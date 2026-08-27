import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';

import { env } from './env.ts';
import { auth, pino } from './lib/index.ts';
import { handleError, handleNotFoundError } from './middleware/errors.ts';
import { routes } from './routes/index.ts';

export const app = express();

app.use(pino);

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(handleNotFoundError);
app.use(handleError);
