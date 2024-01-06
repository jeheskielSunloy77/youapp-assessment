import Navbar from '@/components/layout/navbar/Navbar'
import { Metadata } from 'next'
import RegisterForm from './_shared/components/register-form/RegisterForm'

export default function Register() {
	return (
		<main className='container mx-auto py-6 px-6 md:px-0 h-screen flex items-center justify-center'>
			<Navbar />
			<div className='w-full space-y-8'>
				<h1 className='text-2xl font-bold text-black dark:text-white'>Register</h1>
				<RegisterForm />
				<p className='text-sm text-center text-gray-800 dark:text-gray-100'>
					Have an account?{' '}
					<a href='/login' className='text-amber-500 underline'>
						Login here
					</a>
				</p>
			</div>
		</main>
	)
}

export const metadata: Metadata = { title: 'Register' }
