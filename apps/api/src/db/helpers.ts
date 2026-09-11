import type { Id } from '@repo/contracts/shared';

type EntityName = Capitalize<string>;

type RepositoryInput = Record<string, unknown>;

class RepositoryError extends Error {
	static isRepositoryError(value: unknown) {
		return value instanceof RepositoryError;
	}

	readonly operation;
	readonly entity;
	readonly input;

	constructor(
		operation: 'insertion' | 'selection' | 'update' | 'deletion',
		entity: EntityName,
		input: RepositoryInput,
	) {
		super(`Entity ${operation} failed`);

		this.operation = operation;
		this.entity = entity;
		this.input = input;
	}
}

export class InsertionError extends RepositoryError {
	constructor(entity: EntityName, input: RepositoryInput) {
		super('insertion', entity, input);
	}
}

export class SelectionError extends RepositoryError {
	constructor(entity: EntityName, input: RepositoryInput) {
		super('selection', entity, input);
	}
}

export class UpdateError extends RepositoryError {
	constructor(entity: EntityName, input: RepositoryInput) {
		super('update', entity, input);
	}
}

export class DeletionError extends RepositoryError {
	constructor(entity: EntityName, input: RepositoryInput) {
		super('deletion', entity, input);
	}
}

export const contains = (query?: string) =>
	query == null ? undefined : ({ like: `%${query}%` } as const);

export const orderBy = (sort = 'createdAt', order = 'asc') =>
	({ orderBy: { [sort]: order } }) as const;

export const parseId = (id: Id) => {
	const parsedId = Number.parseInt(id, 10);
	if (!Number.isInteger(parsedId)) throw new Error('Parsed ID is not an integer');
	return parsedId;
};
