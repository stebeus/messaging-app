import type { Timestamps } from '@repo/contracts/shared';
import type { User } from '@repo/contracts/users';
import type { Hono } from 'hono';

type PostJsonOptions = Omit<RequestInit, 'method' | 'body'>;

type TimestampsOptions = Partial<Timestamps>;

type UserOptions = Partial<User>;

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

export const createTimestamps = ({
	createdAt = new Date('2000-01-01T00:00:00'),
	updatedAt = new Date('2000-01-01T00:00:00'),
}: TimestampsOptions = {}) => ({ createdAt, updatedAt }) as const;

export const createUser = ({
	id = '1',
	name = 'John Doe',
	username = 'john_doe',
	displayName = 'john_doe',
	email = 'john_doe@email.com',
	emailIsVerified = false,
	avatar = '',
	...timestamps
}: UserOptions = {}) =>
	({
		...createTimestamps(timestamps),
		id,
		name,
		username,
		displayName,
		email,
		emailIsVerified,
		avatar,
	}) as const;
