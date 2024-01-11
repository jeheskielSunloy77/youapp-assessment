'use client'
import Icon from '@/components/icon/Icon'
import { Theme } from '@/libs/types'
import { ReactNode } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { AppContext, AppContextProvider } from './app-context/AppContext'

export default function GlobalProviders(
	props: AppContext & { children: ReactNode }
) {
	return (
		<>
			<AppToaster theme={props.theme} />
			<AppContextProvider theme={props.theme}>{props.children}</AppContextProvider>
		</>
	)
}

function AppToaster(props: { theme: Theme }) {
	const isDark = props.theme === 'dark'
	return (
		<Toaster
			position='bottom-left'
			containerClassName='hellocontainer'
			toastOptions={{
				style: {
					borderRadius: '0.375rem',
					backgroundColor: isDark ? '#111827' : 'white',
					borderWidth: '1px',
					color: isDark ? '#f3f4f6' : '#1f2937',
					borderColor: isDark ? '#374151' : '#D1D5DB',
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
