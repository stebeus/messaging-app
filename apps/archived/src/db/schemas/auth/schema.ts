import { defineRelationsPart } from 'drizzle-orm';
import { index, snakeCase, uniqueIndex } from 'drizzle-orm/pg-core';

import { base, reference } from '#db/columns.ts';

export const auth = snakeCase.schema('auth');

export const users = auth.table('users', (t) => ({
	...base,
	username: t.text().notNull().unique(),
	displayName: t.text(),
	email: t.text().notNull().unique(),
	avatar: t.text(),
	emailIsVerified: t.boolean().default(false).notNull(),

	// ! Unused Better Auth field
	name: t.text(),
}));

export const sessions = auth.table(
	'sessions',
	(t) => ({
		...base,
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		expiresAt: t.timestamp().notNull(),
		token: t.text().notNull().unique(),
		ipAddress: t.text(),
		userAgent: t.text(),
	}),
	(t) => [index('sessions_userId_idx').on(t.userId)],
);

export const accounts = auth.table(
	'accounts',
	(t) => ({
		...base,
		accountId: t.text().notNull(),
		providerId: t.text().notNull(),
		userId: reference(() => users.id, { onDelete: 'cascade' }).notNull(),
		issuer: t.text().notNull(),
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

export const verifications = auth.table(
	'verifications',
	(t) => ({
		...base,
		identifier: t.text().notNull(),
		value: t.text().notNull(),
		expiresAt: t.timestamp().notNull(),
	}),
	(t) => [index('verifications_identifier_idx').on(t.identifier)],
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
