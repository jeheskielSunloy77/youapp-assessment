import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import RegisterForm from './RegisterForm'

function renderComponent() {
	return render(
		<AppRouterContextProviderMock>
			<RegisterForm />
		</AppRouterContextProviderMock>
	)
}
describe('RegisterForm', () => {
	it('should render a form with correct items', () => {
		const form = renderComponent().container.querySelector('form')
		expect(form).toBeInTheDocument()

		if (!form) return

		const inputs = form.querySelectorAll('input')
		expect(inputs).toHaveLength(4)
		const inputAttr = [
			{ name: 'email', type: 'email' },
			{ name: 'name', type: 'text' },
			{ name: 'password', type: 'password' },
			{ name: 'passwordConf', type: 'password' },
		]

		inputAttr.forEach((attr, i) => {
			expect(inputs[i]).toHaveAttribute('name', attr.name)
			expect(inputs[i]).toHaveAttribute('type', attr.type)
		})

		const button = form.querySelector('button')
		expect(button).toHaveAttribute('type', 'submit')
		expect(button).toHaveTextContent('Register')
	})

	it('should have a disabled submit button when form is invalid', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')
		expect(button).toBeDisabled()
	})

	it('should have an enabled submit button when form is valid', () => {
		const { container } = renderComponent()

		const inputs = container.querySelectorAll('input')
		const inputData = [
			{ name: 'email', write: 'test@email.com' },
			{ name: 'name', write: 'testusername' },
			{ name: 'password', write: 'Password123!' },
			{ name: 'passwordConf', write: 'Password123!' },
		]

		inputs.forEach((input, i) => {
			fireEvent.change(input, { target: { value: inputData[i].write } })
		})

		const button = container.querySelector('button')

		expect(button).toBeEnabled()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
