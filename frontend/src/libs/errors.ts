import { ValidationError as ValidationErrorType } from '@/libs/types'

export class ValidationError extends Error {
	constructor(public errors: ValidationErrorType[]) {
		super()
	}
}
