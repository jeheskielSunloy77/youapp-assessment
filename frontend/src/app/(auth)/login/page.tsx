import Navbar from '@/components/layout/navbar/Navbar'
import { Metadata } from 'next'
import LoginForm from './_shared/components/login-form/LoginForm'

export default function LoginPage() {
	return (
		<div className='background-light'>
			<Navbar />
			<main className='container mx-auto py-6 px-6 md:px-0 h-screen flex items-center justify-center'>
				<div className='w-full space-y-8'>
					<h1 className='text-2xl font-bold text-black dark:text-white'>Login</h1>
					<LoginForm />
					<p className='text-sm text-center text-gray-800 dark:text-gray-100'>
						No account?{' '}
						<a href='/register' className='text-gradient-gold underline'>
							Register here
						</a>
					</p>
				</div>
			</main>
		</div>
	)
}

export const metadata: Metadata = { title: 'User login' }
