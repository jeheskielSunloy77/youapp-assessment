import { ButtonHTMLAttributes } from 'react'

export default function ButtonIcon(props: ButtonIconProps) {
	return (
		<button
			{...props}
			className={`${props.className} ${
				sizes[props.size || 'medium']
			} inline-flex items-center text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
		/>
	)
}

export interface ButtonIconProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: keyof typeof sizes
}

const sizes = {
	xSmall: 'p-0.5 rounded-sm',
	small: 'p-1 rounded-md',
	medium: 'p-2 rounded-lg',
}
