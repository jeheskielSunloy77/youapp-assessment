import { AppContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-context'
import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'
import Navbar from './Navbar'

function renderComponent(props?: ComponentProps<typeof Navbar>) {
	return render(
		<AppRouterContextProviderMock>
			<AppContextProviderMock theme='dark'>
				<Navbar {...props} />
			</AppContextProviderMock>
		</AppRouterContextProviderMock>
	)
}

describe('Navbar', () => {
	it('should render a nav element', () => {
		const { container } = renderComponent()
		const nav = container.querySelector('nav')

		expect(nav).toBeInTheDocument()
		expect(nav).toHaveAttribute('role', 'navigation')
	})

	it('should render a username when provided', () => {
		expect(
			renderComponent().container.querySelector('h6')
		).not.toBeInTheDocument()

		renderComponent({ username: 'test-username' })
		const username = screen.getByRole('heading', { level: 6 })

		expect(username).toBeInTheDocument()
		expect(username).toHaveTextContent('test-username')
	})

	it('should render a right button when provided or more button when username is provided', () => {
		const { container } = renderComponent()

		expect(
			container.querySelector('button[data-testid="more-button"]')
		).not.toBeInTheDocument()

		renderComponent({
			rightButton: <button data-testid='test-right-button'>test-button</button>,
		})
		const button = screen.getByTestId('test-right-button')

		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent('test-button')

		renderComponent({ username: 'test-username' })
		const moreButton = screen.getByTestId('more-button')

		expect(moreButton).toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
