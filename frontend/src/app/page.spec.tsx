import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndexPage from './page'

describe('IndexPage', () => {
	it('should renders a heading', () => {
		render(<IndexPage />)

		const heading = screen.getByRole('heading', { level: 1 })

		expect(heading).toBeInTheDocument()
		expect(heading).toHaveTextContent('Wellcome to the app')
	})
	it('should renders a button to /profile', () => {
		render(<IndexPage />)

		const anchorTag = screen.getByRole('link')

		expect(anchorTag).toBeInTheDocument()
		expect(anchorTag).toHaveAttribute('href', '/profile')
		expect(anchorTag).toContainElement(screen.getByRole('button'))
	})
	it('should match snapshot', () => {
		const { container } = render(<IndexPage />)

		expect(container).toMatchSnapshot()
	})
})
