import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Icon from './Icon'

describe('Icon', () => {
	it('should renders an svg element', () => {
		const { container } = render(<Icon name='close' />)

		expect(container.querySelector('svg')).toBeInTheDocument()
	})
	it('should renders an svg element with proper attributes', () => {
		const { container } = render(<Icon name='close' />)

		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveClass('w-6 h-6')
		expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
	})
	it('should match snapshot', () => {
		expect(render(<Icon name='close' />).container).toMatchSnapshot()
	})
})
