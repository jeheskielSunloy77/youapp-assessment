import { logout } from '@/actions/auth'
import { switchTheme } from '@/actions/theme'
import Icon from '@/components/icon/Icon'
import { Theme } from '@/libs/types'

export default function MoreButtonDropdown(props: { theme: Theme }) {
	const isDark = props.theme === 'dark'
	return (
		<ul className='absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-[rgba(14,25,31,1)]  border dark:border-gray-800'>
			<li>
				<a
					href='/chat'
					className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
				>
					<Icon name='forum-outline' />
					Chat Room
				</a>
			</li>
			<li>
				<a
					href='/profile'
					className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
				>
					<Icon name='account-outline' />
					Profile
				</a>
			</li>
			<hr className='dark:border-gray-800 my-1' />
			<li
				onClick={() => switchTheme(isDark ? 'light' : 'dark')}
				className='cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
			>
				<Icon name={isDark ? 'weather-sunny' : 'weather-night'} />
				{isDark ? 'Light' : 'Dark'} Mode
			</li>
			<li
				onClick={() => logout()}
				className='cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
			>
				<Icon name='logout' />
				Logout
			</li>
		</ul>
	)
}
