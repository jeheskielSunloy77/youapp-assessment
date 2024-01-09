'use server'

import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { setPayload, setToken } from './auth/access-token'
import { HTTPStatusText, User, ValidationError } from './types'

export async function updateUserAbout(formData: FormData) {
	try {
		const res = await axios.patch('http://localhost:8080/users', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		setPayload(res.data)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error

		if (checkStatus('Client error', error.response?.status)) {
			return error.response?.data.message as ValidationError[]
		}
	}
}

export async function updateUserIntrest(formData: FormData) {
	const store = cookies()
	const userCookie = store.get('user')?.value
	const oldUser: User = userCookie ? JSON.parse(userCookie) : null
	const user: User = {
		...oldUser,
		intrests: formData.getAll('intrests') as string[],
	}
	store.set('user', JSON.stringify(user))
	redirect('/')
}

export async function getUser() {
	const userCookie = cookies().get('user')
	if (!userCookie) return null
	let user: User = JSON.parse(userCookie.value)
	user.birthday = new Date(user.birthday)
	return user
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
