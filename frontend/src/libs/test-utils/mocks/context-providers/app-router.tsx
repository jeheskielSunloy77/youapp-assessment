import {
	AppRouterContext,
	AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReactNode } from 'react'

export type AppRouterContextProviderMockProps = {
	router?: Partial<AppRouterInstance>
	children: ReactNode
}

export const AppRouterContextProviderMock = (
	props: AppRouterContextProviderMockProps
) => {
	const mockedRouter: AppRouterInstance = {
		back: jest.fn(),
		forward: jest.fn(),
		push: jest.fn(),
		replace: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
		...props.router,
	}
	return (
		<AppRouterContext.Provider value={mockedRouter}>
			{props.children}
		</AppRouterContext.Provider>
	)
}
