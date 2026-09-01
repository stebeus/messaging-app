export class RepositoryError extends Error {
	constructor(operation: 'create' | 'find' | 'update' | 'destroy', entity: Lowercase<string>) {
		super(`Failed to ${operation} ${entity}`);
	}
}

export const contains = (query?: string) => ({ like: `%${query}%` }) as const;

export const orderBy = (sort = 'createdAt', order = 'asc') =>
	({ orderBy: { [sort]: order } }) as const;

export const parseId = (id: string) => {
	const parsed = Number.parseInt(id, 10);
	if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error('Invalid ID');
	return parsed;
};
