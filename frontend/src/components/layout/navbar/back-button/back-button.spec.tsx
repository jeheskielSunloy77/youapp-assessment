import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import BackButton from './BackButton'

const router = { back: jest.fn() }

function renderComponent() {
	return render(
		<AppRouterContextProviderMock router={router}>
			<BackButton />
		</AppRouterContextProviderMock>
	)
}

describe('BackButton', () => {
	it('should renders a navigation button', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent('Back')
		expect(button).toHaveAttribute('role', 'navigation')

		expect(button).toContainElement(
			container.querySelector('svg[data-testid="chevron-up"]')
		)
	})

	it('should call router.back() when clicked', () => {
		const { container } = renderComponent()
		const button = container.querySelector('button')
		button?.click()
		expect(router.back).toHaveBeenCalled()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
