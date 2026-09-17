import type { ReactNode } from 'react';

export type RenderProps<Props> = (props: Props) => ReactNode;
