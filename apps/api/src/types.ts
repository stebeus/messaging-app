import type { Query } from '@repo/contracts/shared';

export type QueryDto<Dto = Query> = {
	query: Dto;
};

export type BodyDto<Dto> = {
	body: Dto;
};
