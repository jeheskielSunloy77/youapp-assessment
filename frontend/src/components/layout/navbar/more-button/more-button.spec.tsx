import { AppContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-context'
import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import MoreButton from './MoreButton'

function renderComponent() {
	return render(
		<AppContextProviderMock theme='dark'>
			<MoreButton />
		</AppContextProviderMock>
	)
}

describe('MoreButton', () => {
	it('should render a button with proper icon', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')

		expect(button).toBeInTheDocument()

		expect(
			button?.querySelector('svg[data-testid="dots-horizontal"]')
		).toBeInTheDocument()
	})

	it('should render a dropdown when clicked', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')

		expect(button).toBeInTheDocument()

		expect(container.querySelector('ul')).not.toBeInTheDocument()

		act(() => button?.click())

		expect(container.querySelector('ul')).toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
