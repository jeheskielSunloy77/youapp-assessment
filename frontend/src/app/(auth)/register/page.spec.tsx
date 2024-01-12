import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import RegisterPage from './page'

function renderComponent() {
	return render(
		<AppRouterContextProviderMock>
			<RegisterPage />
		</AppRouterContextProviderMock>
	)
}
describe('RegisterPage', () => {
	it('should render an anchor tag to login page', () => {
		const anchor = renderComponent().container.querySelector('a')

		expect(anchor).toBeInTheDocument()
		expect(anchor).toHaveAttribute('href', '/login')
		expect(anchor).toHaveTextContent('Login here')
	})

	it('should render a register form', () => {
		expect(renderComponent().getByTestId('register-form')).toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
