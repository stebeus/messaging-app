import { defineRelationsPart } from 'drizzle-orm';
import { index, snakeCase, uniqueIndex } from 'drizzle-orm/pg-core';

import { id, timestamps } from '#db/columns.ts';

export const users = snakeCase.table('users', (t) => ({
	id,
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	emailVerified: t.boolean().default(false).notNull(),
	image: t.text(),
	...timestamps,
}));

export const sessions = snakeCase.table(
	'sessions',
	(t) => ({
		id,
		expiresAt: t.timestamp().notNull(),
		token: t.text().notNull().unique(),
		...timestamps,
		ipAddress: t.text(),
		userAgent: t.text(),
		userId: t
			.integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	}),
	({ userId }) => [index('sessions_userId_idx').on(userId)],
);

export const accounts = snakeCase.table(
	'accounts',
	(t) => ({
		id,
		issuer: t.text().notNull(),
		accountId: t.text().notNull(),
		providerId: t.text().notNull(),
		userId: t
			.integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		accessToken: t.text(),
		refreshToken: t.text(),
		idToken: t.text(),
		accessTokenExpiresAt: t.timestamp(),
		refreshTokenExpiresAt: t.timestamp(),
		scope: t.text(),
		password: t.text(),
		...timestamps,
	}),
	({ issuer, accountId, userId }) => [
		uniqueIndex('accounts_issuer_accountId_uidx').on(issuer, accountId),
		index('accounts_userId_idx').on(userId),
	],
);

export const verifications = snakeCase.table(
	'verifications',
	(t) => ({
		id,
		identifier: t.text().notNull(),
		value: t.text().notNull(),
		expiresAt: t.timestamp().notNull(),
		...timestamps,
	}),
	({ identifier }) => [index('verifications_identifier_idx').on(identifier)],
);

export const authRelations = defineRelationsPart(
	{ users, sessions, accounts, verifications },
	(r) => ({
		users: {
			sessions: r.many.sessions({
				from: r.users.id,
				to: r.sessions.userId,
			}),
			accounts: r.many.accounts({
				from: r.users.id,
				to: r.accounts.userId,
			}),
		},
		sessions: {
			user: r.one.users({
				from: r.sessions.userId,
				to: r.users.id,
			}),
		},
		accounts: {
			user: r.one.users({
				from: r.accounts.userId,
				to: r.users.id,
			}),
		},
	}),
);
