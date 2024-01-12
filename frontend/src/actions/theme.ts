'use server'

import { Theme } from '@/libs/types'
import { cookies } from 'next/headers'

export async function switchTheme(theme: Theme) {
	cookies().set('theme', theme, {
		maxAge: 60 * 60 * 24 * 365 * 10,
		path: '/',
	})
}

export async function getTheme() {
	return cookies().get('theme')?.value as Theme
}
