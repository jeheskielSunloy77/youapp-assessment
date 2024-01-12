'use client'

import { Theme } from '@/libs/types'
import { ReactNode, createContext, useContext } from 'react'

export interface AppContext {
	theme: Theme
}
export const AppContext = createContext({} as AppContext)

export function AppContextProvider(
	props: AppContext & { children: ReactNode }
) {
	return (
		<AppContext.Provider value={{ theme: props.theme }}>
			{props.children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}
