export interface User {
	name: string
	email: string
	birthday: Date
	height: number
	weight: number
	zodiac: Zodiac
	horoscope: Horoscope
	gender: Gender
	interests: string[]
	avatarUrl: string
	_id: string
	password: string
}

export type Gender = 'Male' | 'Female'

export type Zodiac =
	| 'Aries'
	| 'Taurus'
	| 'Gemini'
	| 'Cancer'
	| 'Leo'
	| 'Virgo'
	| 'Libra'
	| 'Scorpio'
	| 'Sagittarius'
	| 'Capricorn'
	| 'Aquarius'
	| 'Pisces'

export type Horoscope =
	| 'Tiger'
	| 'Ox'
	| 'Rat'
	| 'Pig'
	| 'Dog'
	| 'Rooster'
	| 'Monkey'
	| 'Sheep'
	| 'Horse'
	| 'Snake'
	| 'Dragon'
	| 'Rabbit'

export type HTTPStatusText =
	| 'Informational'
	| 'Successful'
	| 'Redirection'
	| 'Client error'
	| 'Server error'

export type Theme = 'light' | 'dark'
