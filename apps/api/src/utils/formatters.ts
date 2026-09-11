export const toTitleCase = (string: string) => {
	const initialsRegex = /\b\w/g;
	const capitalize = (char: string) => char.toUpperCase();
	return string.toLowerCase().replace(initialsRegex, capitalize);
};
