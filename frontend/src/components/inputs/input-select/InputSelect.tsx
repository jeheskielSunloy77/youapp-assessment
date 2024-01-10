interface Props
	extends React.HTMLAttributes<HTMLSelectElement>,
		BaseInputProps {}

export default function InputSelect(props: Props) {
	return (
		<div className={props.containerClassName}>
			{props.label && (
				<label htmlFor={props.label} className={props.labelClassName}>
					{props.label}
				</label>
			)}
			<select id={props.label} {...props}>
				<option value='' disabled selected>
					Select Gender
				</option>
				<option value='Male'>Male</option>
				<option value='Female'>Female</option>
			</select>
			{props.error && (
				<p className='text-xs text-red-500 absolute -bottom-4'>{props.error}</p>
			)}
		</div>
	)
}
