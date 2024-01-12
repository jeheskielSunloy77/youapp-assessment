'use client'
import Icon from '@/components/icon/Icon'
import Loader from '@/components/loader/Loader'
import { User } from '@/libs/types'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { UserInfo } from './user-info/UserInfo'

const EditForm = dynamic(() => import('./edit-form/EditForm'), {
	loading: Loader,
})

export default function AboutUser(props: { user: Partial<User> }) {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className='bg-gray-100 dark:bg-[rgba(14,25,31,1)] rounded-lg p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold text-black dark:text-white'>About</h3>
				{isEditing ? (
					<button
						key='save-n-update'
						data-testid='save-n-update'
						type='submit'
						form='about-user'
						className='text-gradient-gold text-sm hover:underline'
					>
						Save & Update
					</button>
				) : (
					<button
						key='open-edit-form'
						data-testid='open-edit-form'
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
