'use client'
import { updateUser } from '@/actions/user'
import InputSelect from '@/components/inputs/input-select/InputSelect'
import InputText, {
	InputTextProps,
} from '@/components/inputs/input-text/InputText'
import { zodiacs } from '@/libs/constants'
import { ValidationError, ValidationErrorType } from '@/libs/errors'
import { User } from '@/libs/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type FormField =
	| keyof Pick<
			User,
			'birthday' | 'horoscope' | 'weight' | 'height' | 'zodiac' | 'name' | 'gender'
	  >
	| 'avatar'

export default function AboutUserEditForm(props: {
	user: Partial<User>
	setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
	const [errors, setErrors] = useState<ValidationErrorType<FormField> | null>(
		null
	)
	const [birthday, setBirthday] = useState<string | undefined>(
		props.user.birthday?.toISOString().split('T')[0]
	)

	function handleSubmit(formData: FormData) {
		const promise = updateUser(formData).then((err) => {
			if (err) throw new ValidationError(err)
		})

		toast.promise(promise, {
			loading: 'Updating data...',
			success: () => {
				props.setIsEditing(false)
				return 'Data updated!'
			},
			error: (err) => {
				if (err instanceof ValidationError) {
					setErrors(err.errors)
					return 'Invalid input!'
				}
				return 'Something went wrong!'
			},
		})
	}

	const zodiac = birthday ? zodiacs[new Date(birthday).getMonth()] : null
	return (
		<form id='about-user' className='space-y-2' action={handleSubmit}>
			<ImageInput imageUrl={props.user.avatarUrl} error={errors?.avatar} />
			<div className='space-y-4'>
				<InputText
					className='w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400'
					labelClassName='text-xs text-gray-600 dark:text-gray-400'
					containerClassName='flex items-center justify-between'
					errorClassName='text-xs text-red-600 text-end'
					label='Display Name'
					name='name'
					placeholder='Enter Name'
					defaultValue={props.user.name}
					minLength={3}
					error={errors?.name}
				/>
				<InputSelect
					className='w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end disabled:text-gray-500 '
					labelClassName='text-xs text-gray-600 dark:text-gray-400'
					containerClassName='flex items-center justify-between'
					errorClassName='text-xs text-red-600 text-end'
					label='Gender'
					name='gender'
					placeholder='Select Gender'
					defaultValue={props.user.gender}
					options={[
						{ label: 'Male', value: 'Male' },
						{ label: 'Female', value: 'Female' },
					]}
					error={errors?.gender}
				/>
				<InputText
					className='w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400'
					labelClassName='text-xs text-gray-600 dark:text-gray-400'
					containerClassName='flex items-center justify-between'
					errorClassName='text-xs text-red-600 text-end'
					label='Birthday'
					name='birthday'
					type='date'
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					max={dayjs().format('YYYY-MM-DD')}
					error={errors?.birthday}
				/>
				<InputText
					className='w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400'
					labelClassName='text-xs text-gray-600 dark:text-gray-400'
					containerClassName='flex items-center justify-between'
					errorClassName='text-xs text-red-600 text-end'
					label='Horoscope'
					name='horoscope'
					readOnly
					placeholder='--'
					value={zodiac?.horoscope || ''}
					error={errors?.horoscope}
				/>
				<InputText
					className='w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400'
					labelClassName='text-xs text-gray-600 dark:text-gray-400'
					containerClassName='flex items-center justify-between'
					errorClassName='text-xs text-red-600 text-end'
					label='Zodiac'
					name='zodiac'
					readOnly
					placeholder='--'
					value={zodiac?.zodiac || ''}
					error={errors?.zodiac}
				/>
				<InputWithUnit
					label='Height'
					name='height'
					unit='cm'
					placeholder='Add Height'
					defaultValue={props.user.height}
					min={40}
					max={300}
					error={errors?.height}
				/>
				<InputWithUnit
					label='Weight'
					name='weight'
					unit='kg'
					placeholder='Add Weight'
					defaultValue={props.user.weight}
					min={10}
					max={300}
					error={errors?.weight}
				/>
			</div>
		</form>
	)
}

function InputWithUnit(props: InputTextProps & { unit: string }) {
	const [isFilled, setIsFiled] = useState(!!props.defaultValue)

	return (
		<InputText
			className={`w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400 ${
				isFilled ? 'pr-10' : ''
			}`}
			labelClassName='text-xs text-gray-600 dark:text-gray-400'
			containerClassName='flex items-center justify-between relative'
			onChange={(e) => setIsFiled(!!e.target.value)}
			type='number'
			errorClassName='text-xs text-red-600 text-end'
			icon={
				isFilled && (
					<span className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 text-sm'>
						{props.unit}
					</span>
				)
			}
			{...props}
		/>
	)
}

function ImageInput(props: { imageUrl?: string; error?: string }) {
	const [imageUrl, setImageUrl] = useState(props.imageUrl)
	const [error, setError] = useState(props.error)

	useEffect(() => {
		setError(props.error)
	}, [props.error])

	return (
		<label
			htmlFor='image-input'
			className='flex items-center gap-4 group cursor-pointer w-fit'
		>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt='profile'
					className='w-16 h-16 rounded-2xl object-cover object-center'
					width={64}
					height={64}
				/>
			) : (
				<div className='bg-gray-200 dark:bg-white dark:bg-opacity-[0.08] rounded-2xl w-16 h-16 flex items-start justify-center text-amber-500 text-5xl font-extralight group-hover:bg-gray-300 dark:group-hover:bg-gray-700'>
					<div className='mt-1 text-gradient-gold'>+</div>
				</div>
			)}
			<div>
				<span className='text-gray-800 dark:text-gray-100 text-sm group-hover:underline font-medium'>
					{imageUrl ? 'Change' : 'Add'} Profile Image
				</span>
				{error && <p className='text-xs text-red-600'>{error}</p>}
			</div>
			<input
				id='image-input'
				type='file'
				name='avatar'
				accept='image/png, image/jpeg, image/jpg, image/webp'
				className='sr-only'
				onChange={(e) => {
					const file = e.target.files?.item(0)
					if (!file) return

					if (file?.size > 1024 * 1024 * 3) {
						e.currentTarget.value = ''
						return setError('File size must be less than 3MB')
					}

					setImageUrl(URL.createObjectURL(file))
				}}
			/>
		</label>
	)
}
