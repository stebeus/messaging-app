import type { Query } from '@repo/contracts/shared';

export type QueryParameters<QueryDto = Query> = {
	query: QueryDto;
};

export type ScopedQueryParameters<Parameters, QueryDto = Query> = Parameters &
	QueryParameters<QueryDto>;
