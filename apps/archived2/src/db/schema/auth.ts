import { index, snakeCase, uniqueIndex } from 'drizzle-orm/pg-core';

import { base, reference } from './helpers.ts';

export const authSchema = snakeCase.schema('auth');

export const users = authSchema.table('users', (t) => ({
	...base,
	name: t.text().notNull(),
	username: t.text().notNull().unique(),
	displayName: t.text(),
	email: t.text().notNull().unique(),
	emailIsVerified: t.boolean().default(false).notNull(),
	avatar: t.text(),
}));

export const sessions = authSchema.table(
	'sessions',
	(t) => ({
		...base,
		expiresAt: t.timestamp().notNull(),
		token: t.text().notNull().unique(),
		ipAddress: t.text(),
		userAgent: t.text(),
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	}),
	(t) => [index('sessions_userId_idx').on(t.userId)],
);

export const accounts = authSchema.table(
	'accounts',
	(t) => ({
		...base,
		issuer: t.text().notNull(),
		accountId: t.text().notNull(),
		providerId: t.text().notNull(),
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		accessToken: t.text(),
		refreshToken: t.text(),
		idToken: t.text(),
		accessTokenExpiresAt: t.timestamp(),
		refreshTokenExpiresAt: t.timestamp(),
		scope: t.text(),
		password: t.text(),
	}),
	(t) => [
		uniqueIndex('accounts_issuer_accountId_uidx').on(t.issuer, t.accountId),
		index('accounts_userId_idx').on(t.userId),
	],
);

export const verifications = authSchema.table(
	'verifications',
	(t) => ({
		...base,
		identifier: t.text().notNull(),
		value: t.text().notNull(),
		expiresAt: t.timestamp().notNull(),
	}),
	(t) => [index('verifications_identifier_idx').on(t.identifier)],
);
