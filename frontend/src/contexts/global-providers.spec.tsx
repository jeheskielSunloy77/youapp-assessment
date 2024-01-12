import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import GlobalProviders from './global-providers'

function renderComponent() {
	return render(
		<GlobalProviders theme={'dark'}>
			<div>test children</div>
		</GlobalProviders>
	)
}

describe('GlobalProviders', () => {
	it('renders its children children properly', () => {
		const { getByText } = renderComponent()

		expect(getByText('test children')).toBeInTheDocument()
	})

	it('should render a toaster', () => {
		expect(
			renderComponent().container.querySelector('div.app-toaster')
		).toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
