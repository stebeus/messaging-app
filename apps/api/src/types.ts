import type { Query } from '@repo/contracts/shared';

export type QueryArgs<QueryDto = Query> = {
	query: QueryDto;
};

export type ScopedQueryParameters<Parameters, QueryDto = Query> = Parameters & QueryArgs<QueryDto>;

export type BodyArgs<Dto> = {
	body: Dto;
};
