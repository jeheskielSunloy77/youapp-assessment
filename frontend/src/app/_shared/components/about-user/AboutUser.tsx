'use client'
import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'
import InputText, {
	InputTextProps,
} from '@/components/inputs/input-text/InputText'
import { updateUser } from '@/libs/actions'
import { zodiacs } from '@/libs/constants'
import { ValidationError } from '@/libs/errors'
import { User } from '@/libs/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'

export default function AboutUser(props: { user: User }) {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold text-black dark:text-white'>About</h3>
				{isEditing ? (
					<button
						type='submit'
						form='about-user'
						className='text-amber-500 text-sm hover:underline'
					>
						Save & Update
					</button>
				) : (
					<ButtonIcon onClick={() => setIsEditing(true)}>
						<Icon
							name='pencil-outline'
							className='w-4 h-4 text-gray-700 dark:text-gray-200'
						/>
					</ButtonIcon>
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
	bio: Pick<User, 'birthday' | 'horoscope' | 'weight' | 'height' | 'zodiac'>
}) {
	if (!Object.values(props.bio).some((val) => val))
		return (
			<p className='text-sm text-gray-700 dark:text-gray-400'>
				Add in yours to help others know you better.
			</p>
		)
	return (
		<div>
			<div className='space-y-2'>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Birthday: </span>
					{dayjs(props.bio.birthday).format('DD / MM / YYYY')} (Age
					{dayjs().diff(props.bio.birthday, 'year')})
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Horoscope: </span>
					{props.bio.horoscope}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Zodiac: </span>
					{props.bio.zodiac}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Height: </span>
					{props.bio.height}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Weight: </span>
					{props.bio.weight}
				</p>
			</div>
		</div>
	)
}

function EditForm(props: {
	user: User
	setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
	const [errors, setErrors] = useState<ValidationError['errors'] | null>(null)
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
			<ImageInput />
			<InputText
				className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400'
				labelClassName='text-xs text-gray-600 dark:text-gray-400'
				containerClassName='flex items-center justify-between'
				label='Display Name'
				name='name'
				placeholder='Enter Name'
				defaultValue={props.user.name}
				minLength={3}
				error={errors?.find((err) => err.property === 'name')?.message}
			/>
			<SelectGender />
			<InputText
				className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400'
				labelClassName='text-xs text-gray-600 dark:text-gray-400'
				containerClassName='flex items-center justify-between'
				label='Birthday'
				name='birthday'
				type='date'
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
				max={dayjs().format('YYYY-MM-DD')}
				error={errors?.find((err) => err.property === 'birthday')?.message}
			/>
			<InputText
				className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400'
				labelClassName='text-xs text-gray-600 dark:text-gray-400'
				containerClassName='flex items-center justify-between'
				label='Horoscope'
				name='horoscope'
				readOnly
				placeholder='--'
				value={zodiac?.horoscope || ''}
				defaultValue={props.user.horoscope}
				error={errors?.find((err) => err.property === 'horoscope')?.message}
			/>
			<InputText
				className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400'
				labelClassName='text-xs text-gray-600 dark:text-gray-400'
				containerClassName='flex items-center justify-between'
				label='Zodiac'
				name='zodiac'
				readOnly
				placeholder='--'
				value={zodiac?.zodiac || ''}
				defaultValue={props.user.zodiac}
				error={errors?.find((err) => err.property === 'zodiac')?.message}
			/>
			<InputWithUnit
				label='Height'
				name='height'
				unit='cm'
				placeholder='Add Height'
				defaultValue={props.user.height}
				min={40}
				max={300}
				error={errors?.find((err) => err.property === 'height')?.message}
			/>
			<InputWithUnit
				label='Weight'
				name='weight'
				unit='kg'
				placeholder='Add Weight'
				defaultValue={props.user.weight}
				min={10}
				max={300}
				error={errors?.find((err) => err.property === 'weight')?.message}
			/>
		</form>
	)
}

function SelectGender(props: { defaultValue?: string; error?: string }) {
	return (
		<div className='flex items-center justify-between'>
			<label htmlFor='gender' className='text-xs text-gray-600 dark:text-gray-400'>
				Gender:
			</label>
			<select
				id='gender'
				name='gender'
				className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end disabled:text-gray-500 '
				defaultValue={props.defaultValue}
			>
				<option value='' disabled selected>
					Select Gender
				</option>
				<option value='Male'>Male</option>
				<option value='Female'>Female</option>
			</select>
			{props.error && <p className='text-xs text-red-500'>{props.error}</p>}
		</div>
	)
}

function InputWithUnit(props: InputTextProps & { unit: string }) {
	const [isFilled, setIsFiled] = useState(!!props.defaultValue)

	return (
		<div className='relative'>
			<InputText
				className={`w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400 ${
					isFilled ? 'pr-10' : ''
				}`}
				labelClassName='text-xs text-gray-600 dark:text-gray-400'
				containerClassName='flex items-center justify-between relative'
				onChange={(e) => setIsFiled(!!e.target.value)}
				type='number'
				{...props}
			/>
			{isFilled && (
				<span className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 text-sm'>
					{props.unit}
				</span>
			)}
		</div>
	)
}

function ImageInput(props: { imageUrl?: string }) {
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
			<span className='text-gray-800 dark:text-gray-100 text-sm group-hover:underline font-medium'>
				{imageUrl ? 'Change' : 'Add'} Profile Image
			</span>
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
