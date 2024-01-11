'use client'
import { updateUser } from '@/actions/user'
import Icon from '@/components/icon/Icon'
import InputSelect from '@/components/inputs/input-select/InputSelect'
import InputText, {
	InputTextProps,
} from '@/components/inputs/input-text/InputText'
import { zodiacs } from '@/libs/constants'
import { ValidationError, ValidationErrorType } from '@/libs/errors'
import { User } from '@/libs/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'

export default function AboutUser(props: { user: Partial<User> }) {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className='bg-gray-100 dark:bg-[rgba(14,25,31,1)] rounded-lg p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold text-black dark:text-white'>About</h3>
				{isEditing ? (
					<button
						key='save-n-update'
						type='submit'
						form='about-user'
						className='text-gradient-gold text-sm hover:underline'
					>
						Save & Update
					</button>
				) : (
					<button
						key='open-edit-form'
						className='button-ghost'
						onClick={() => setIsEditing(true)}
					>
						<Icon
							name='pencil-outline'
							className='w-4 h-4 text-gray-700 dark:text-gray-200'
						/>
					</button>
				)}
			</div>
			{isEditing ? (
				<EditForm setIsEditing={setIsEditing} user={props.user} />
			) : (
				<UserInfo
					bio={{
						birthday: props.user.birthday,
						horoscope: props.user.horoscope,
						weight: props.user.weight,
						height: props.user.height,
						zodiac: props.user.zodiac,
					}}
				/>
			)}
		</div>
	)
}

function UserInfo(props: {
	bio: Partial<
		Pick<User, 'birthday' | 'horoscope' | 'weight' | 'height' | 'zodiac'>
	>
}) {
	if (!Object.values(props.bio).some((val) => val))
		return (
			<p className='text-sm text-gray-700 dark:text-gray-400'>
				Add in yours to help others know you better.
			</p>
		)
	return (
		<div className='space-y-2'>
			<p className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Birthday:{' '}
				</span>
				{dayjs(props.bio.birthday).format('DD / MM / YYYY')} (Age
				{dayjs().diff(props.bio.birthday, 'year')})
			</p>
			<p className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Horoscope:{' '}
				</span>
				{props.bio.horoscope}
			</p>
			<p className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Zodiac:{' '}
				</span>
				{props.bio.zodiac}
			</p>
			<p className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Height:{' '}
				</span>
				{props.bio.height}
			</p>
			<p className='text-black dark:text-white'>
				<span className='text-gray-400 dark:text-white dark:text-opacity-30'>
					Weight:{' '}
				</span>
				{props.bio.weight}
			</p>
		</div>
	)
}

type FormField =
	| keyof Pick<
			User,
			'birthday' | 'horoscope' | 'weight' | 'height' | 'zodiac' | 'name' | 'gender'
	  >
	| 'avatar'

function EditForm(props: {
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
				<div className='bg-gray-700 rounded-2xl w-16 h-16 flex items-start justify-center text-amber-500 text-5xl font-extralight group-hover:bg-gray-600'>
					<div className='mt-1'>+</div>
				</div>
			)}
			<div>
				<span className='text-gray-800 dark:text-gray-100 text-sm group-hover:underline font-medium'>
					{imageUrl ? 'Change' : 'Add'} Profile Image
				</span>
				{props.error && <p className='text-xs text-red-600'>{props.error}</p>}
			</div>
			<input
				id='image-input'
				type='file'
				name='avatar'
				accept='image/png, image/jpeg, image/jpg, image/webp'
				className='sr-only'
				onChange={(e) => {
					const file = e.target.files?.item(0)
					file && setImageUrl(URL.createObjectURL(file))
				}}
			/>
		</label>
	)
}
