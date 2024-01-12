import { Theme } from '@/libs/types'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { AppContextProvider } from './AppContext'

function renderComponent(theme: Theme) {
	return render(
		<AppContextProvider theme={theme}>
			<div>the theme is : {theme}</div>
		</AppContextProvider>
	)
}

describe('AppContextProvider', () => {
	it('renders children with the provided theme', () => {
		const theme = 'dark'
		const { getByText } = renderComponent(theme)

		expect(getByText(`the theme is : ${theme}`)).toBeInTheDocument()
	})
	it('should match snapshot', () => {
		expect(renderComponent('dark').container).toMatchSnapshot()
	})
})
