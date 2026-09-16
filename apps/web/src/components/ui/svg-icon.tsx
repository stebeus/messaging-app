import { toKebabCase } from '#utils/formatters.ts';

type SvgIconProps = {
	title: string;
};

export const SvgIcon = ({ title }: SvgIconProps) => (
	<svg width={24} height={24} fill="currentColor">
		<title>{title}</title>
		<use href={`/icons.svg#${toKebabCase(title)}-icon`} />
	</svg>
);
