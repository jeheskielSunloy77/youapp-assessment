'use server'

import { Theme } from '@/libs/types'
import { cookies } from 'next/headers'

export async function switchTheme(theme: Theme) {
	cookies().set('theme', theme)
}

export async function getTheme() {
	return cookies().get('theme')?.value as Theme
}
