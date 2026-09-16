const sanitizeString = (string: string) => {
	const nonAlphanumericRegex = /[^\p{L}\p{N}]+/gu;
	return string.replace(nonAlphanumericRegex, ' ').trim();
};

export const toCamelCase = (string: string) => {
	const capitalizeRemainder = (_: string, char: string) => char.toUpperCase();
	return sanitizeString(string).toLowerCase().replace(/ (\w)/g, capitalizeRemainder);
};

export const toKebabCase = (string: string) =>
	sanitizeString(string).toLowerCase().replaceAll(' ', '-');
