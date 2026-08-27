import { pinoHttp } from 'pino-http';

export const pino = pinoHttp({
	level: 'trace',
	transport: {
		target: 'pino-pretty',
	},
});

export const { logger } = pino;
