'use server'

import { setToken } from '@/libs/auth/access-token'
import { NewValidationError } from '@/libs/types'
import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'

export async function register(data: FormData) {
	try {
		const res = await axios.post('http://localhost:8080/auth/register', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		setToken(res.data.accessToken)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error
		const code = error.response?.status

		if (code && code >= 400 && code < 500)
			return error.response?.data.message as NewValidationError
	}
}

export async function login(data: { credential: string; password: string }) {
	try {
		const res = await axios.post('http://localhost:8080/auth/login', data)
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
