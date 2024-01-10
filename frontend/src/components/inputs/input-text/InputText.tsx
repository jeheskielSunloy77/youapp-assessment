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
		<div className={props.containerClassName}>
			{props.label && (
				<label htmlFor={props.label} className={props.labelClassName}>
					{props.label}
				</label>
			)}
			<input
				id={props.label}
				onChange={(e) => setError(e.currentTarget.validationMessage)}
				{...props}
			/>
			{error && <p className='text-xs text-red-500 absolute -bottom-4'>{error}</p>}
			{props.icon}
		</div>
	)
}
