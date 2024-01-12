import {
	AppContext,
	AppContextProvider,
} from '@/contexts/app-context/AppContext'
import { ComponentProps } from 'react'

export type AppContextProviderMockProps = ComponentProps<
	typeof AppContextProvider
>

export const AppContextProviderMock = (props: AppContextProviderMockProps) => {
	return (
		<AppContext.Provider value={{ theme: props.theme }}>
			{props.children}
		</AppContext.Provider>
	)
}
