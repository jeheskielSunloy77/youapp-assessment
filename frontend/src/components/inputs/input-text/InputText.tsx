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

	return (
		<div className='space-y-0.5'>
			<div className={props.containerClassName}>
				{props.label && (
					<label htmlFor={props.label} className={props.labelClassName}>
						{props.label}
					</label>
				)}
				<input
					id={props.label}
					{...props}
					onChange={(e) => {
						setError(e.currentTarget.validationMessage)
						props.onChange?.(e)
					}}
				/>
				{props.icon}
			</div>
			{error && (
				<p className={props.errorClassName || 'text-xs text-red-500'}>{error}</p>
			)}
		</div>
	)
}
