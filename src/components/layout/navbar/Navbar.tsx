import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'

export default function Navbar(props: { username?: string }) {
	return (
		<nav className='fixed top-8 flex items-center justify-between px-4 text-black dark:text-white w-full z-50'>
			<ButtonIcon className='hover:text-gray-600 hover:dark:text-gray-300'>
				<Icon name='chevron-up' className='w-6 h-6 -rotate-90 ' />
				Back
			</ButtonIcon>
			{props.username && (
				<>
					<h6 className='text-sm font-bold'>{props.username}</h6>
					<ButtonIcon className='hover:text-gray-600 hover:dark:text-gray-300'>
						<Icon name='dots-horizontal' />
					</ButtonIcon>
				</>
			)}
		</nav>
	)
}
