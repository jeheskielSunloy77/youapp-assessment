'use server'

import { cookies } from 'next/headers'
import { Gender, User, Zodiac } from './types'

export async function updateUserAbout(formData: FormData) {
	const user: User = {
		name: formData.get('name') as string,
		birthday: new Date(formData.get('birthday') as string),
		height: Number(formData.get('height') as string),
		weight: Number(formData.get('weight') as string),
		zodiac: formData.get('zodiac') as Zodiac,
		gender: formData.get('gender') as Gender,
		horoscope: formData.get('horoscope') as string,
	}
	cookies().set('user', JSON.stringify(user))
}

export async function getUser() {
	const userCookie = cookies().get('user')
	if (!userCookie) return null
	let user: User = JSON.parse(userCookie.value)
	user.birthday = new Date(user.birthday)
	return user
}
