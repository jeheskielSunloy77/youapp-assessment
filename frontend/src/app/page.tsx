import { Metadata } from 'next'

export default function Login() {
	return (
		<div className='background-light'>
			<main className='container mx-auto py-6 px-6 md:px-0 h-screen flex items-center justify-center'>
				<div className='space-y-2'>
					<h1 className='text-2xl font-bold text-black dark:text-white'>
						Wellcome to the app
					</h1>
					<a href='/profile'>
						<button className='button-gradient w-full'>Get started</button>
					</a>
				</div>
			</main>
		</div>
	)
}

export const metadata: Metadata = { title: 'Index page' }
