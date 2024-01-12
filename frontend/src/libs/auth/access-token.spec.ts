import jwt from 'jsonwebtoken'
import { parseToken, removeToken } from './access-token'

const user = {
	name: 'testing',
}
const mockToken = jwt.sign(user, process.env.JWT_SECRET as string)

jest.mock('next/headers', () => ({
	cookies: jest.fn().mockReturnValueOnce({
		get: jest.fn().mockReturnValueOnce(() => ({ value: mockToken })),
		delete: jest.fn(),
		set: jest.fn(),
	}),
}))

describe('access token', () => {
	describe('parseToken', () => {
		it('should parse token to a jwt payload', () => {
			const { error, payload } = parseToken(mockToken)
			expect(error).toBeUndefined()

			expect(payload).toBeDefined()
			if (!payload) return

			expect(payload).toHaveProperty('name')
			expect(payload).toHaveProperty('iat')

			expect(payload.name).toBe('testing')
		})

		it('should return error if token is invalid', () => {
			const { error, payload } = parseToken('invalid token')
			expect(error).toBeDefined()
			expect(payload).toBeUndefined()
		})
	})

	describe('removeToken', () => {
		it.skip('should remove token', () => {
			const cookies = require('next/headers').cookies()
			const spy = jest.spyOn(cookies, 'delete')

			removeToken()
			expect(spy).toHaveBeenCalledWith('token')
		})
	})
})
