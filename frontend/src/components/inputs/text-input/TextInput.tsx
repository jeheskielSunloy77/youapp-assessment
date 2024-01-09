'use client'
import { ReactNode, useEffect, useState } from 'react'

export interface TextInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	icon?: ReactNode
	containerClassName?: string
}
export function TextInput(props: TextInputProps) {
	const [error, setError] = useState(props.error)

	useEffect(() => setError(props.error), [props.error])

	return (
		<div className={props.containerClassName}>
			<input
				onChange={(e) => setError(e.currentTarget.validationMessage)}
				{...props}
			/>
			{error && <p className='text-xs text-red-500 absolute -bottom-4'>{error}</p>}
			{props.icon}
		</div>
	)
}
