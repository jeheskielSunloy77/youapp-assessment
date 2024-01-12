'use client'
import { ReactNode, useEffect, useState } from 'react'

export interface InputTextProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		BaseInputProps {
	icon?: ReactNode
}
export default function InputText(props: InputTextProps) {
	const [error, setError] = useState(props.error)

	useEffect(() => setError(props.error), [props.error])

	const {
		error: _,
		containerClassName,
		label,
		labelClassName,
		errorClassName,
		icon,
		onChange,
		...inputProps
	} = props

	return (
		<div className='space-y-0.5' role='container'>
			<div className={containerClassName}>
				{label && (
					<label htmlFor={label} className={labelClassName}>
						{label}
					</label>
				)}
				<input
					id={label}
					{...inputProps}
					onChange={(e) => {
						setError(e.currentTarget.validationMessage)
						onChange?.(e)
					}}
				/>
				{icon}
			</div>
			{error && (
				<p className={errorClassName || 'text-xs text-red-600'}>{error}</p>
			)}
		</div>
	)
}
