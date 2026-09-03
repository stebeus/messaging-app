import type { Query } from '@repo/contracts/shared';

export type QueryParameters<QueryType = Query> = {
	query: QueryType;
};
