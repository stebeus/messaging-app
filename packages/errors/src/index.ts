export const catchError = (value: unknown) => {
	if (Error.isError(value)) return value;

	let serialized = '[Non-serializable value]';

	try {
		serialized = JSON.stringify(value, undefined, '\t');
	} catch {}

	return new Error(`Unexpected throw: ${serialized}`);
};
