import type { Hono } from 'hono';

type PostJsonOptions = Omit<RequestInit, 'method' | 'body'>;

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
