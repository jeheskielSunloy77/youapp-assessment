import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import LoginForm from './LoginForm'

function renderComponent() {
	return render(
		<AppRouterContextProviderMock>
			<LoginForm />
		</AppRouterContextProviderMock>
	)
}
describe('LoginForm', () => {
	it('should render a form with correct items', () => {
		const form = renderComponent().container.querySelector('form')
		expect(form).toBeInTheDocument()

		if (!form) return

		const inputs = form.querySelectorAll('input')
		expect(inputs).toHaveLength(2)
		expect(inputs[0]).toHaveAttribute('name', 'credential')
		expect(inputs[0]).toHaveAttribute('type', 'text')
		expect(inputs[1]).toHaveAttribute('name', 'password')
		expect(inputs[1]).toHaveAttribute('type', 'password')

		const button = form.querySelector('button')
		expect(button).toHaveAttribute('type', 'submit')
		expect(button).toHaveTextContent('Login')
	})

	it('should have a disabled submit button when form is invalid', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')
		expect(button).toBeDisabled()
	})

	it('should have an enabled submit button when form is valid', () => {
		const { container } = renderComponent()
		const credentialInput = container.querySelector('input[name="credential"]')
		const passwordInput = container.querySelector('input[name="password"]')
		const button = container.querySelector('button')

		fireEvent.change(credentialInput!, { target: { value: 'test' } })
		fireEvent.change(passwordInput!, { target: { value: 'Password123!' } })
		expect(button).toBeEnabled()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
