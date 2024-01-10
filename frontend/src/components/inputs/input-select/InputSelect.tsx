interface Props
	extends React.SelectHTMLAttributes<HTMLSelectElement>,
		BaseInputProps {
	placeholder?: string
	options: { label: string; value: string }[]
}

export default function InputSelect(props: Props) {
	return (
		<div className='space-y-0.5'>
			<div className={props.containerClassName}>
				{props.label && (
					<label htmlFor={props.label} className={props.labelClassName}>
						{props.label}
					</label>
				)}
				<select id={props.label} {...props}>
					{props.placeholder && (
						<option value='' disabled selected>
							{props.placeholder}
						</option>
					)}
					{props.options.map((opt) => (
						<option value={opt.value} key={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			{props.error && (
				<p className='text-xs text-red-500 absolute -bottom-4'>{props.error}</p>
			)}
		</div>
	)
}
