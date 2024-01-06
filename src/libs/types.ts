export interface User {
	name: string
	birthday: Date
	height: number
	weight: number
	zodiac: Zodiac
	horoscope: string
	gender: Gender
	intrests: string[]
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
