'use server'

import { parseToken, setPayload } from '@/libs/auth/access-token'
import { ValidationErrorType } from '@/libs/errors'
import { User } from '@/libs/types'
import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'

export async function updateUser(formData: FormData) {
	const token = cookies().get('token')?.value
	const user = parseToken(token)
	if (!user) return

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
		const code = error.response?.status
		if (code && code >= 400 && code < 500)
			return error.response?.data.message as ValidationErrorType
	}
}

export async function getUser() {
	const token = cookies().get('token')?.value
	const userPayload = parseToken(token)
	if (!userPayload) return

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
