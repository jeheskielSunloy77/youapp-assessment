export interface InputSelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement>,
		BaseInputProps {
	placeholder?: string
	options: { label: string; value: string }[]
}

export default function InputSelect(props: InputSelectProps) {
	const {
		error,
		containerClassName,
		label,
		labelClassName,
		errorClassName,
		placeholder,
		options,
		...inputProps
	} = props

	return (
		<div className='space-y-0.5'>
			<div className={containerClassName}>
				{label && (
					<label htmlFor={label} className={labelClassName}>
						{label}
					</label>
				)}
				<select id={label} {...inputProps}>
					{placeholder && (
						<option value='' disabled className='dark:bg-gray-800'>
							{placeholder}
						</option>
					)}
					{options.map((opt) => (
						<option value={opt.value} key={opt.value} className='dark:bg-gray-800'>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			{error && (
				<p role='alert' className={errorClassName || 'text-xs text-red-600'}>
					{error}
				</p>
			)}
		</div>
	)
}
