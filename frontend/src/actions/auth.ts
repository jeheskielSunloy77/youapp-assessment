'use server'
import { parseToken, setToken } from '@/libs/auth/access-token'
import axios from '@/libs/axios'
import { ValidationErrorType } from '@/libs/errors'
import { AxiosError } from 'axios'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function register(data: FormData) {
	try {
		const res = await axios.post('/auth/register', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		setToken(res.data.accessToken)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error
		const code = error.response?.status

		if (code && code >= 400 && code < 500)
			return error.response?.data.message as ValidationErrorType
	}
}

export async function login(data: { credential: string; password: string }) {
	try {
		const res = await axios.post('/auth/login', data)
		setToken(res.data.accessToken)
	} catch (error) {
		if (error instanceof AxiosError) {
			const code = error.response?.status

			if (code && code >= 400 && code < 500) return 'Invalid username or password'
		}

		return 'Something went wrong'
	}
}

export async function logout() {
	cookies().set('token', '')
}

export async function revalidateToken(token: string) {
	const { error } = parseToken(token)

	console.log('ERROR PARSING TOKEN:', error)

	if (!(error instanceof jwt.TokenExpiredError)) {
		console.log('TOKEN NOT EXPIRED!')

		return
	}

	const revalidatedToken: string = await fetch(
		`${process.env.BACKEND_URL}/auth/revalidateToken`,
		{
			method: 'PATCH',
			headers: { Authorization: `Bearer ${token}` },
		}
	)
		.then((res) =>
			res.json().then((d) => {
				console.log(d)

				return d.accessToken
			})
		)
		.catch((err) => {
			console.log('TOKEN REVALIDATION ERROR:', err)

			return ''
		})

	return revalidatedToken
}
