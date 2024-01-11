'use client'
import { register } from '@/actions/auth'
import InputPassword from '@/components/inputs/input-password/InputPassword'
import InputText from '@/components/inputs/input-text/InputText'
import { ValidationError, ValidationErrorType } from '@/libs/errors'
import { User } from '@/libs/types'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

type FormField =
	| keyof Pick<User, 'email' | 'name' | 'password'>
	| 'passwordConf'

export default function RegisterForm() {
	const [isSubmittable, setIsSubmitable] = useState(false)
	const [errors, setErrors] = useState<ValidationErrorType<FormField> | null>(
		null
	)
	const router = useRouter()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const promise = register(new FormData(e.currentTarget)).then((err) => {
			if (err) throw new ValidationError(err)
		})

		toast.promise(promise, {
			loading: 'Registering...',
			success: () => {
				router.push('/')
				return 'Register successful!'
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

	return (
		<form
			className='space-y-6'
			onChange={(e) => setIsSubmitable(e.currentTarget.checkValidity())}
			onSubmit={handleSubmit}
		>
			<InputText
				className='input-primary'
				error={errors?.email}
				name='email'
				type='email'
				placeholder='Enter Email'
				required
			/>
			<InputText
				className='input-primary'
				error={errors?.name}
				name='name'
				placeholder='Create Username'
				minLength={3}
				required
			/>
			<InputPassword
				error={errors?.password}
				name='password'
				placeholder='Create Password'
				className='input-primary'
				minLength={8}
				pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$'
				required
			/>
			<InputPassword
				error={errors?.passwordConf}
				name='passwordConf'
				placeholder='Confirm Password'
				className='input-primary'
				minLength={8}
				pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$'
				required
			/>
			<button
				type='submit'
				disabled={!isSubmittable}
				className='w-full font-bold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-60'
			>
				Register
			</button>
		</form>
	)
}
