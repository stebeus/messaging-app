import { env } from '#env.ts';

type ErrorResponse<Cause> = {
	status: number;
	message: string;
	cause?: Cause;
};

export class FetchError<Cause> extends Error {
	static isFetchError<Cause>(value: unknown): value is FetchError<Cause> {
		return value instanceof FetchError;
	}

	readonly status;
	readonly cause;

	constructor({ status, message, cause }: ErrorResponse<Cause>) {
		super(message);
		this.status = status;
		this.cause = cause;
	}
}

export const fetchData = async <Data, ErrorCause = unknown>(
	endpoint: string,
	options?: RequestInit,
): Promise<Data> => {
	const res = await fetch(`${env.VITE_API_URL}/${endpoint}`, options);
	const { data, error } = await res.json();

	if (!res.ok) throw new FetchError<ErrorCause>(error);

	return data;
};
