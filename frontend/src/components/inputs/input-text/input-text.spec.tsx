import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InputText, { InputTextProps } from './InputText'

function renderComponent(props?: InputTextProps) {
	return render(<InputText name='test' placeholder='test' {...props} />)
}

describe('InputText', () => {
	it('should renders an input tag with proper attributes', () => {
		const input = renderComponent().container.querySelector('input')

		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('name', 'test')
		expect(input).toHaveAttribute('placeholder', 'test')
	})

	it('should renders a label when provided', () => {
		const { container } = renderComponent({ label: 'test' })

		const input = container.querySelector('input')
		const label = container.querySelector('label')

		expect(input).toBeInTheDocument()
		expect(label).toBeInTheDocument()
		expect(label).toHaveTextContent('test')
		expect(label).toHaveAttribute('for', 'test')
		expect(input).toHaveAttribute('id', 'test')
	})
	it('should render an error text when provided', () => {
		renderComponent({ error: 'error-message' })
		const error = screen.getByRole('alert')

		expect(error).toBeInTheDocument()
		expect(error).toHaveTextContent('error-message')
	})
	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
