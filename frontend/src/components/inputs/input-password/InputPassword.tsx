import Icon from '@/components/icon/Icon'
import { useState } from 'react'
import InputText, { InputTextProps } from '../input-text/InputText'

export default function InputPassword(props: InputTextProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<InputText
			type={isVisible ? 'text' : 'password'}
			containerClassName='relative'
			icon={
				<Icon
					name={isVisible ? 'eye-off-outline' : 'eye-outline'}
					className='w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer'
					onClick={() => setIsVisible((prev) => !prev)}
				/>
			}
			{...props}
		/>
	)
}
