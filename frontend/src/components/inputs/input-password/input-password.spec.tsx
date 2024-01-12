import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'
import InputPassword from './InputPassword'

function renderComponent(props?: ComponentProps<typeof InputPassword>) {
	return render(<InputPassword {...props} />)
}

describe('InputPassword', () => {
	it('should renders an input tag with type password', () => {
		const input = renderComponent().container.querySelector('input')
		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('type', 'password')

		const inputContainer = screen.getByRole('container')

		expect(inputContainer).toBeInTheDocument()
		expect(inputContainer).toContainElement(screen.getByTestId('eye-outline'))
	})

	it('should renders an input tag with type text on clicking the eye icon', () => {
		const { container } = renderComponent()
		const input = container.querySelector('input')

		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('type', 'password')

		const eyeIcon = screen.getByTestId('eye-outline')
		expect(eyeIcon).toBeInTheDocument()

		fireEvent.click(eyeIcon)
		expect(input).toHaveAttribute('type', 'text')
	})
	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
