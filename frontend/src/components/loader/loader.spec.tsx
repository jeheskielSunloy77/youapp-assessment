import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
	it('should renders a div with role for loader', () => {
		render(<Loader />)

		const divTag = screen.getByRole('loader')
		expect(divTag).toBeInTheDocument()
		expect(divTag).toHaveClass('loader')
	})
	it('should match snapshot', () => {
		expect(render(<Loader />).container).toMatchSnapshot()
	})
})
