'use client'
import Icon from '@/components/icon/Icon'
import { useAppContext } from '@/contexts/app-context/AppContext'
import { useState } from 'react'
import MoreButtonDropdown from './MoreButtonDropdown'

export default function MoreButton() {
	const [isDropdown, setIsDropdown] = useState(false)
	const { theme } = useAppContext()

	return (
		<div className='relative'>
			<button
				className='button-ghost'
				onClick={() => setIsDropdown((prev) => !prev)}
			>
				<Icon
					name='dots-horizontal'
					className={`w-6 h-6 transition-transform ${isDropdown ? 'rotate-90' : ''}`}
				/>
			</button>
			{isDropdown && <MoreButtonDropdown theme={theme} />}
		</div>
	)
}
