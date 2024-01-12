'use client'
import { login } from '@/actions/auth'
import InputPassword from '@/components/inputs/input-password/InputPassword'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginForm() {
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
				router.push('/profile')
				return 'Login successful'
			},
			error: (err) => err,
		})
	}

	return (
		<form
			data-testid='login-form'
			className='space-y-6'
			onChange={(e) => setIsSubmitable(e.currentTarget.checkValidity())}
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				className='input-primary'
				name='credential'
				placeholder='Enter Username/Email'
				minLength={3}
				required
			/>
			<InputPassword
				name='password'
				placeholder='Enter Password'
				minLength={8}
				required
				className='input-primary'
			/>

			<button
				type='submit'
				disabled={!isSubmittable}
				className='w-full button-gradient'
			>
				Login
			</button>
		</form>
	)
}
