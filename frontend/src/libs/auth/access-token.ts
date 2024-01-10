import jwt from 'jsonwebtoken'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { User } from '../types'

export function removeToken() {
	cookies().set('token', '', { ...baseOptions, maxAge: 0 })
}

export function setToken(token: string, isRemember?: boolean) {
	cookies().set('token', token, {
		...baseOptions,
		maxAge: isRemember ? 60 * 60 * 24 * 30 : undefined,
	})
}

export function setPayload(payload: User, isRemember?: boolean) {
	cookies().set(
		'token',
		jwt.sign(
			payload,
			process.env.JWT_SECRET as string,
			isRemember ? { expiresIn: '30d' } : undefined
		),
		{
			...baseOptions,
			maxAge: isRemember ? 60 * 60 * 24 * 30 : undefined,
		}
	)
}

const baseOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	path: '/',
} as ResponseCookie

export function parseToken(token?: string) {
	if (!token) token = cookies().get('token')?.value
	if (!token) return null

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as User | null
		return payload
	} catch (error) {
		console.error(error)

		return null
	}
}
