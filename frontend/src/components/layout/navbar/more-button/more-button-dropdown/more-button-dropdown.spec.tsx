import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import MoreButtonDropdown from './MoreButtonDropdown'

describe('MoreButtonDropdown', () => {
	it('should renders an unordered list of 4 items', () => {
		const { container } = render(<MoreButtonDropdown theme='dark' />)
		const ul = container.querySelector('ul')

		expect(ul).toBeInTheDocument()

		const lists = container.querySelectorAll('li')
		expect(lists).toHaveLength(4)

		lists.forEach((list) => {
			expect(list).toBeInTheDocument()
			expect(ul).toContainElement(list)
		})
	})

	it('should renders proper links', () => {
		const { container } = render(<MoreButtonDropdown theme='dark' />)
		const lists = container.querySelectorAll('li')

		expect(lists[0].querySelector('a')).toHaveAttribute('href', '/chat')
		expect(lists[1].querySelector('a')).toHaveAttribute('href', '/profile')
	})

	it('should renders correct theme mode icon', () => {
		const { container } = render(<MoreButtonDropdown theme='dark' />)
		const lists = container.querySelectorAll('li')

		expect(
			lists[2].querySelector('svg[data-testid="weather-sunny"]')
		).toBeInTheDocument()
		expect(
			lists[2].querySelector('svg[data-testid="weather-night"]')
		).not.toBeInTheDocument()

		expect(lists[2]).toHaveTextContent('Light Mode')
	})

	it('should match snapshot', () => {
		expect(
			render(<MoreButtonDropdown theme='dark' />).container
		).toMatchSnapshot()
	})
})
