import { ButtonHTMLAttributes } from 'react'

export default function Button({
	className,
	variant,
	size,
	color,
	type,
	...restProps
}: ButtonProps) {
	return (
		<button
			type={type || 'button'}
			className={`inline-flex justify-center items-center gap-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:cursor-not-allowed ${className} ${
				buttonStyles.variant[variant || 'solid'][color || 'primary']
			} ${buttonStyles.size[size || 'medium']}`}
			{...restProps}
		/>
	)
}

const buttonStyles = {
	variant: {
		solid: {
			primary:
				'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500',
			secondary:
				'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500',
			error:
				'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500',
			warning:
				'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-500',
			success:
				'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500',
		},
		outline: {
			primary:
				'border-2 border-gray-200 text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500',
			secondary:
				'border-2 border-gray-200 text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 dark:border-gray-700 dark:hover:border-gray-500',
			error:
				'border-2 border-gray-200 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 dark:border-gray-700 dark:hover:border-red-500',
			warning:
				'border-2 border-gray-200 text-yellow-500 hover:text-white hover:bg-yellow-500 hover:border-yellow-500 dark:border-gray-700 dark:hover:border-yellow-500',
			success:
				'border-2 border-gray-200 text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 dark:border-gray-700 dark:hover:border-green-500',
		},
		ghost: {
			primary:
				'border-transparent text-blue-500 hover:bg-blue-100 focus:ring-blue-500',
			secondary:
				'border-transparent text-gray-500 hover:bg-gray-100 focus:ring-gray-500',
			error: 'border-transparent text-red-500 hover:bg-red-100 focus:ring-red-500',
			warning:
				'border-transparent text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-500',
			success:
				'border-transparent text-green-500 hover:bg-green-100 focus:ring-green-500',
		},
	},
	size: {
		xSmall: 'text-xs py-1 px-2',
		small: 'text-xs 2xl:text-sm py-1 px-2 2xl:py-1.5 2xl:px-3',
		medium: 'text-xs 2xl:text-sm py-1.5 px-3 2xl:py-2 2xl:px-4',
		large: 'text-xs 2xl:text-sm py-2 px-4 2xl:py-3 2xl:px-5',
	},
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof (typeof buttonStyles)['variant']
	size?: keyof (typeof buttonStyles)['size']
	color?: keyof (typeof buttonStyles)['variant']['solid']
}
