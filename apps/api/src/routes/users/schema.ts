import { index, snakeCase, uniqueIndex } from 'drizzle-orm/pg-core';

import { base, reference } from '#db/columns.ts';

export const users = snakeCase.table('users', (t) => ({
	...base,
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	emailVerified: t.boolean().default(false).notNull(),
	image: t.text(),
}));

export const sessions = snakeCase.table(
	'sessions',
	(t) => ({
		...base,
		expiresAt: t.timestamp().notNull(),
		token: t.text().notNull().unique(),
		ipAddress: t.text(),
		userAgent: t.text(),
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
	}),
	({ userId }) => [index('sessions_userId_idx').on(userId)],
);

export const accounts = snakeCase.table(
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
	({ issuer, accountId, userId }) => [
		uniqueIndex('accounts_issuer_accountId_uidx').on(issuer, accountId),
		index('accounts_userId_idx').on(userId),
	],
);

export const verifications = snakeCase.table(
	'verifications',
	(t) => ({
		...base,
		identifier: t.text().notNull(),
		value: t.text().notNull(),
		expiresAt: t.timestamp().notNull(),
	}),
	({ identifier }) => [index('verifications_identifier_idx').on(identifier)],
);
