import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Chat from './Chat'

const token = 'some super secret token'

describe('Chat', () => {
	it('should render a form with 2 inputs', () => {
		const form = render(<Chat token={token} />).container.querySelector('form')

		expect(form).toBeInTheDocument()
		if (!form) return

		const inputs = form.querySelectorAll('input')
		expect(inputs).toHaveLength(2)

		const inputAttr = [
			{ name: 'message', type: 'text' },
			{ name: 'attachment', type: 'file' },
		]

		inputs.forEach((input, i) => {
			expect(input).toHaveAttribute('name', inputAttr[i].name)
			expect(input).toHaveAttribute('type', inputAttr[i].type)
		})
	})

	it('should render a h1 with text "Chat room"', () => {
		const h1 = render(<Chat token={token} />).container.querySelector('h1')

		expect(h1).toBeInTheDocument()
		expect(h1).toHaveTextContent('Chat room')
	})

	it('should match snapshot', () => {
		expect(render(<Chat token={token} />).container).toMatchSnapshot()
	})
})
