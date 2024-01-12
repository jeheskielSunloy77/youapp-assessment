import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InputSelect, { InputSelectProps } from './InputSelect'

function makeOptions(arr: string[]) {
	return arr.map((str) => ({ label: str, value: str }))
}

function renderComponent(props?: InputSelectProps) {
	return render(
		<InputSelect
			name='test'
			options={makeOptions(['test1', 'test2'])}
			{...props}
		/>
	)
}

describe('InputSelect', () => {
	it('should renders an select tag with proper attributes', () => {
		const select = renderComponent().container.querySelector('select')

		expect(select).toBeInTheDocument()
		expect(select).toHaveAttribute('name', 'test')
	})

	it('should renders an select tag with a placeholder selected option', () => {
		const { container } = renderComponent({
			options: makeOptions(['test1', 'test2']),
			placeholder: 'placeholder-text',
		})
		const select = container.querySelector('select')

		expect(select).toBeInTheDocument()
		const placeholder = container.querySelector('option')
		expect(select).toContainElement(placeholder)
		expect(placeholder).toHaveAttribute('disabled')
		expect(placeholder).toHaveAttribute('value', '')
		expect(placeholder).toHaveTextContent('placeholder-text')
	})

	it('should renders options tags with provided option array', () => {
		const selectOptions = makeOptions(['option1', 'option2'])
		const { container } = renderComponent({
			options: selectOptions,
		})
		const select = container.querySelector('select')

		expect(select).toBeInTheDocument()
		const options = container.querySelectorAll('option')

		expect(options).toHaveLength(selectOptions.length)

		options.forEach((option, index) => {
			expect(option).toHaveAttribute('value', selectOptions[index].value)
			expect(option).toHaveTextContent(selectOptions[index].label)
		})
	})

	it('should renders a label when provided', () => {
		const { container } = renderComponent({
			options: makeOptions(['test1', 'test2']),
			label: 'test-label',
		})

		const select = container.querySelector('select')
		const label = container.querySelector('label')

		expect(select).toBeInTheDocument()
		expect(label).toBeInTheDocument()
		expect(label).toHaveTextContent('test-label')
		expect(label).toHaveAttribute('for', 'test-label')
		expect(select).toHaveAttribute('id', 'test-label')
	})

	it('should render an error text when provided', () => {
		renderComponent({
			error: 'error-message',
			options: makeOptions(['test1', 'test2']),
		})
		const error = screen.getByRole('alert')

		expect(error).toBeInTheDocument()
		expect(error).toHaveTextContent('error-message')
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
