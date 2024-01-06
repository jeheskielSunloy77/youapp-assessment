'use client'
import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'
import { updateUserAbout } from '@/libs/actions'
import { zodiacs } from '@/libs/constants'
import { User } from '@/libs/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

interface AboutUserProps {
	user: User | null
}
export default function AboutUser(props: AboutUserProps) {
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
				<UserInfo user={props.user} />
			)}
		</div>
	)
}

function UserInfo(props: AboutUserProps) {
	if (!props.user)
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
					{dayjs(props.user.birthday).format('DD / MM / YYYY')} (Age
					{dayjs().diff(props.user.birthday, 'year')})
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Horoscope: </span>
					{props.user.horoscope}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Zodiac: </span>
					{props.user.zodiac}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Height: </span>
					{props.user.height}
				</p>
				<p className='text-black dark:text-white'>
					<span className='text-gray-300 dark:text-gray-600'>Weight: </span>
					{props.user.weight}
				</p>
			</div>
		</div>
	)
}

function EditForm(
	props: AboutUserProps & { setIsEditing: Dispatch<SetStateAction<boolean>> }
) {
	const [birthday, setBirthday] = useState<string | undefined>(
		props.user?.birthday?.toISOString().split('T')[0]
	)

	const zodiac = birthday ? zodiacs[new Date(birthday).getMonth()] : null
	return (
		<form
			id='about-user'
			className='space-y-2'
			action={(formData) => {
				updateUserAbout(formData)
				props.setIsEditing(false)
			}}
		>
			<ImageInput />
			<Input
				label='Display Name'
				name='name'
				placeholder='Enter Name'
				defaultValue={props.user?.name}
			/>
			<div className='flex items-center justify-between'>
				<label
					htmlFor='gender'
					className='text-xs text-gray-600 dark:text-gray-400'
				>
					Gender:
				</label>
				<select
					id='gender'
					name='gender'
					className='w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end disabled:text-gray-500 '
					defaultValue={props.user?.gender}
				>
					<option value='' disabled selected>
						Select Gender
					</option>
					<option value='Male'>Male</option>
					<option value='Female'>Female</option>
				</select>
			</div>
			<Input
				label='Birthday'
				name='birthday'
				type='date'
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
			/>
			<Input
				label='Horoscope'
				name='horoscope'
				readOnly
				placeholder='--'
				value={zodiac?.horoscope || ''}
				defaultValue={props.user?.horoscope}
			/>
			<Input
				label='Zodiac'
				name='zodiac'
				readOnly
				placeholder='--'
				value={zodiac?.zodiac || ''}
				defaultValue={props.user?.zodiac}
			/>
			<InputWithUnit
				label='Height'
				name='height'
				unit='cm'
				placeholder='Add Height'
				type='number'
				defaultValue={props.user?.height}
			/>
			<InputWithUnit
				label='Weight'
				name='weight'
				unit='kg'
				placeholder='Add Weight'
				type='number'
				defaultValue={props.user?.weight}
			/>
		</form>
	)
}

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
	label: string
	name: string
}
function Input(props: InputProps) {
	return (
		<div className='flex items-center justify-between'>
			<label
				htmlFor={props.name}
				className='text-xs text-gray-600 dark:text-gray-400'
			>
				{props.label}:
			</label>
			<input
				id={props.name}
				{...props}
				className={`w-2/3 border dark:border-gray-600 bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end read-only:text-gray-400 ${props.className}`}
				required
			/>
		</div>
	)
}

function InputWithUnit(props: InputProps & { unit: string }) {
	const [value, setValue] = useState(props.defaultValue || '')

	return (
		<div className='relative'>
			<Input
				{...props}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={value ? 'pr-10' : undefined}
			/>
			{value && (
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
				name='profileImage'
				accept='image/png, image/jpeg, image/jpg'
				className='sr-only'
				required={true}
				onChange={(e) => {
					const file = e.target.files?.item(0)
					file && setImageUrl(URL.createObjectURL(file))
				}}
			/>
		</label>
	)
}
