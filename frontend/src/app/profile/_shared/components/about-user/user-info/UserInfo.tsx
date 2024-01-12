import { User } from '@/libs/types'
import dayjs from 'dayjs'

export function UserInfo(props: {
	bio: Partial<
		Pick<User, 'birthday' | 'horoscope' | 'weight' | 'height' | 'zodiac'>
	>
}) {
	if (!Object.values(props.bio).some((val) => val))
		return (
			<p
				data-testid='user-info'
				className='text-sm text-gray-700 dark:text-gray-400'
			>
				Add in yours to help others know you better.
			</p>
		)
	return (
		<ul data-testid='user-info' className='space-y-2'>
			<li className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Birthday:{' '}
				</span>
				{dayjs(props.bio.birthday).format('DD / MM / YYYY')} (Age
				{dayjs().diff(props.bio.birthday, 'year')})
			</li>
			<li className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Horoscope:{' '}
				</span>
				{props.bio.horoscope}
			</li>
			<li className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Zodiac:{' '}
				</span>
				{props.bio.zodiac}
			</li>
			<li className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Height:{' '}
				</span>
				{props.bio.height}
			</li>
			<li className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Weight:{' '}
				</span>
				{props.bio.weight}
			</li>
		</ul>
	)
}
