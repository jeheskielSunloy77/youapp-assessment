import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LoginPage from './page'

function renderComponent() {
	return render(
		<AppRouterContextProviderMock>
			<LoginPage />
		</AppRouterContextProviderMock>
	)
}
describe('LoginPage', () => {
	it('should render an anchor tag to register page', () => {
		const anchor = renderComponent().container.querySelector('a')

		expect(anchor).toBeInTheDocument()
		expect(anchor).toHaveAttribute('href', '/register')
		expect(anchor).toHaveTextContent('Register here')
	})

	it('should render a login form', () => {
		expect(renderComponent().getByTestId('login-form')).toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
