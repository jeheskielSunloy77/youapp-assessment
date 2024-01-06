'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Gender, User, Zodiac } from './types'

export async function updateUserAbout(formData: FormData) {
	const store = cookies()
	const userCookie = store.get('user')?.value
	const oldUser: User | null = userCookie ? JSON.parse(userCookie) : null
	const user: User = {
		name: formData.get('name') as string,
		birthday: new Date(formData.get('birthday') as string),
		height: Number(formData.get('height') as string),
		weight: Number(formData.get('weight') as string),
		zodiac: formData.get('zodiac') as Zodiac,
		gender: formData.get('gender') as Gender,
		horoscope: formData.get('horoscope') as string,
		intrests: oldUser?.intrests || [],
	}
	store.set('user', JSON.stringify(user))
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
