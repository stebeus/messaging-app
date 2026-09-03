export class RepositoryError extends Error {
	constructor(operation: 'create' | 'find' | 'update' | 'delete', entity: Lowercase<string>) {
		super(`Failed to ${operation} ${entity}`);
	}
}

export class CreationError extends RepositoryError {
	constructor(entity: Lowercase<string>) {
		super('create', entity);
	}
}

export const contains = (query?: string) => ({ like: `%${query}%` }) as const;

export const orderBy = (sort = 'createdAt', order = 'asc') =>
	({ orderBy: { [sort]: order } }) as const;

export const parseId = (id: number | string) => {
	const parsed = Number(id);
	if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error('Invalid ID');
	return parsed;
};
