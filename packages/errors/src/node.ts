import { catchError } from './index.js';

interface ErrnoException extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
}

export const catchNodeError = (value: unknown): ErrnoException =>
	catchError(value) as ErrnoException;
