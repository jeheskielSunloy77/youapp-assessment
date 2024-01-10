'use server'

import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { parseToken, setPayload, setToken } from './auth/access-token'
import { HTTPStatusText, User, ValidationError } from './types'

export async function updateUser(formData: FormData) {
	const token = cookies().get('token')?.value
	const user = parseToken(token)
	if (!user) return redirect('/login')

	const avatar = formData.get('avatar')
	if (avatar instanceof File && !avatar.size) formData.delete('avatar')

	try {
		const res = await axios.patch(
			`http://localhost:8080/users/${user._id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			}
		)

		setPayload(res.data)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error
		if (checkStatus('Client error', error.response?.status)) {
			return error.response?.data.message as ValidationError[]
		}
	}
}

export async function login(data: { credential: string; password: string }) {
	try {
		const res = await axios.post('http://localhost:8080/auth/login', data)
		setToken(res.data.accessToken)
	} catch (error) {
		if (error instanceof AxiosError) {
			if (checkStatus('Client error', error.response?.status))
				return 'Invalid username or password'
		}

		return 'Something went wrong'
	}
}

export async function register(data: FormData) {
	try {
		const res = await axios.post('http://localhost:8080/auth/register', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		setToken(res.data.accessToken)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error

		if (checkStatus('Client error', error.response?.status)) {
			return error.response?.data.message as ValidationError[]
		}
	}
}

function checkStatus(text: HTTPStatusText, code?: number) {
	if (!code) return false

	switch (text) {
		case 'Informational':
			return code >= 100 && code < 200
		case 'Successful':
			return code >= 200 && code < 300
		case 'Redirection':
			return code >= 300 && code < 400
		case 'Client error':
			return code >= 400 && code < 500
		case 'Server error':
			return code >= 500 && code < 600
		default:
			return false
	}
}

export async function getUser() {
	const token = cookies().get('token')?.value
	const userPayload = parseToken(token)
	if (!userPayload) redirect('/login')

	const user: User = await axios
		.get(`http://localhost:8080/users/${userPayload._id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data)

	if (user.birthday) user.birthday = new Date(user.birthday)

	return user
}
