import { ReactNode } from 'react'
import BackButton from './more-button/BackButton'
import MoreButton from './more-button/MoreButton'

interface Props {
	username?: string
	rightButton?: ReactNode
}

export default async function Navbar(props: Props) {
	return (
		<nav className='fixed top-8 text-black dark:text-white w-full z-50'>
			<div className='container mx-auto px-4 sm:px-0 flex items-center justify-between'>
				<BackButton />
				{props.username && <h6 className='text-sm font-bold'>{props.username}</h6>}
				{props.rightButton || (props.username && <MoreButton />)}
			</div>
		</nav>
	)
}
