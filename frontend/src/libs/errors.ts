export type ValidationErrorType<T extends string = string> = Record<T, string>

export class ValidationError extends Error {
	constructor(public errors: ValidationErrorType) {
		super()
	}
}
