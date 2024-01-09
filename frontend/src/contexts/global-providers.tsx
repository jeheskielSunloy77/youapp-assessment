'use client'
import Icon from '@/components/icon/Icon'
import { ReactNode } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

export default function GlobalProviders(props: { children: ReactNode }) {
	return (
		<>
			<AppToaster />
			{props.children}
		</>
	)
}

function AppToaster() {
	return (
		<Toaster
			position='bottom-left'
			toastOptions={{
				className:
					'bg-white dark:bg-gray-900 rounded-lg text-high border border-gray-200 dark:border-gray-800 dark:text-gray-200',
				style: {
					borderRadius: '0.125rem',
				},
			}}
		>
			{(t) => (
				<ToastBar toast={t}>
					{({ icon, message }) => (
						<>
							{icon}
							{message}
							{t.type !== 'loading' && (
								<button
									type='button'
									onClick={() => toast.dismiss(t.id)}
									className='ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8  dark:hover:bg-gray-700'
								>
									<Icon name='close' className='w-6 h-6' />
								</button>
							)}
						</>
					)}
				</ToastBar>
			)}
		</Toaster>
	)
}
