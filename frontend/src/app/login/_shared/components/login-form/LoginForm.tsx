'use client'
import Icon from '@/components/icon/Icon'
import { useState } from 'react'

export default function LoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
	return (
		<form
			className='space-y-4'
			onChange={(e) => {
				const username = e.currentTarget.username.value
				const password = e.currentTarget.password.value
				if (username && password) setIsReadyToSubmit(true)
				else setIsReadyToSubmit(false)
			}}
		>
			<input
				name='username'
				className='bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				placeholder='Enter Username/Email'
			/>
			<div className='relative'>
				<input
					type={isPasswordVisible ? 'text' : 'password'}
					name='password'
					className='bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Enter Password'
				/>
				<Icon
					name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
					className='w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer'
					onClick={() => setIsPasswordVisible((prev) => !prev)}
				/>
			</div>
			<button
				type='submit'
				disabled={!isReadyToSubmit}
				className='w-full font-bold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-60'
			>
				Login
			</button>
		</form>
	)
}