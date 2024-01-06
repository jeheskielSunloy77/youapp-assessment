import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'
import { ReactNode } from 'react'
import BackButton from './BackButton'

interface Props {
	username?: string
	rightButton?: ReactNode
}

export default function Navbar(props: Props) {
	return (
		<nav className='fixed top-8 flex items-center justify-between px-4 text-black dark:text-white w-full z-50'>
			<BackButton />
			{props.username && <h6 className='text-sm font-bold'>{props.username}</h6>}
			{props.rightButton || (
				<ButtonIcon className='hover:text-gray-600 hover:dark:text-gray-300'>
					<Icon name='dots-horizontal' />
				</ButtonIcon>
			)}
		</nav>
	)
}
