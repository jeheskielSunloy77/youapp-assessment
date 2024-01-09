'use client'
import Icon from '@/components/icon/Icon'
import { login } from '@/libs/actions'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isSubmittable, setIsSubmitable] = useState(false)

	const router = useRouter()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const promise = login({
			credential: e.currentTarget.credential.value,
			password: e.currentTarget.password.value,
		}).then((err) => {
			if (err) throw err
		})

		toast.promise(promise, {
			loading: 'Logging in...',
			success: () => {
				router.push('/')
				return 'Login successful'
			},
			error: (err) => err,
		})
	}

	return (
		<form
			className='space-y-6'
			onChange={(e) => setIsSubmitable(e.currentTarget.checkValidity())}
			onSubmit={handleSubmit}
		>
			<input
				className='input-primary'
				name='credential'
				placeholder='Enter Username/Email'
				minLength={3}
				required
			/>
			<div className='relative'>
				<input
					className='input-primary'
					type={isPasswordVisible ? 'text' : 'password'}
					name='password'
					placeholder='Enter Password'
					minLength={8}
					required
				/>
				<Icon
					name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
					className='w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer'
					onClick={() => setIsPasswordVisible((prev) => !prev)}
				/>
			</div>

			<button
				type='submit'
				disabled={!isSubmittable}
				className='w-full font-bold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-60'
			>
				Login
			</button>
		</form>
	)
}
