import { app } from './app.ts';
import { env } from './env.ts';
import { logger } from './lib/logger.ts';

app.listen(env.PORT, () => logger.info(`Server running on port ${env.PORT}`));
