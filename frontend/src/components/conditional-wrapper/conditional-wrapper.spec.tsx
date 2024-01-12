import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ConditionalWrapper from './ConditionalWrapper'

function renderComponent(props?: { condition?: boolean }) {
	return render(
		<ConditionalWrapper
			condition={props?.condition ?? true}
			wrapper={(children) => <div role='wrapper'>{children}</div>}
		>
			<div role='children' />
		</ConditionalWrapper>
	)
}

describe('ConditionalWrapper', () => {
	it('should renders a wrapper', () => {
		renderComponent()

		const wrapper = screen.getByRole('wrapper')
		expect(wrapper).toBeInTheDocument()
	})

	it('should renders children inside', () => {
		renderComponent()

		const wrapper = screen.getByRole('wrapper')
		expect(wrapper).toBeInTheDocument()
		expect(wrapper).toContainElement(screen.getByRole('children'))
	})
	it('should only render children if condition is false', () => {
		renderComponent({ condition: false })

		expect(screen.queryByRole('wrapper')).not.toBeInTheDocument()
		expect(screen.getByRole('children')).toBeInTheDocument()
	})
	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
