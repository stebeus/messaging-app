import type { Hono } from 'hono';

import { user } from './constants.ts';

type PostJsonOptions = Omit<RequestInit, 'method' | 'body'>;

export const createEndpoint = (endpoint: string) => `/api/v1/${endpoint}`;

export const postJson = async (
	app: Hono,
	url: string | Request | URL,
	body: unknown,
	{ headers, ...rest }: PostJsonOptions = {},
) =>
	await app.request(url, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json', ...headers }),
		body: JSON.stringify(body),
		...rest,
	});

export const generateUniqueString = (string?: string) =>
	`${string}_${Temporal.Now.instant().epochNanoseconds}`;

export const generateEmail = (email: string = user.username) =>
	generateUniqueString(`${email}@email.com`);
