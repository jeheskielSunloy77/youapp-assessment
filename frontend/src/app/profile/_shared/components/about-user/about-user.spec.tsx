import { User } from '@/libs/types'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { ComponentProps } from 'react'
import { act } from 'react-dom/test-utils'
import AboutUser from './AboutUser'

const user: Partial<User> = {
	name: 'thisisatestname',
	weight: 40,
}

function renderComponent(props?: Partial<ComponentProps<typeof AboutUser>>) {
	return render(<AboutUser user={user} {...props} />)
}
describe('AboutUser', () => {
	it('should render user info & edit button initialy', () => {
		const component = renderComponent()
		expect(component.getByTestId('user-info')).toBeInTheDocument()

		const editButton = component.getByTestId('open-edit-form')
		expect(editButton).toBeInTheDocument()
		expect(editButton).toHaveClass('button-ghost')
		expect(
			editButton.querySelector('svg[data-testid="pencil-outline"]')
		).toBeInTheDocument()
	})

	it('should render edit form when edit button is clicked', () => {
		const component = renderComponent()
		const editButton = component.getByTestId('open-edit-form')
		expect(component.getByTestId('user-info')).toBeInTheDocument()

		act(() => {
			fireEvent.click(editButton)
		})

		waitFor(() => {
			expect(
				component.container.querySelector('form[id="about-user"]')
			).toBeInTheDocument()
		})

		expect(editButton).not.toBeInTheDocument()
		expect(
			component.container.querySelector('[data-testid="user-info"]')
		).not.toBeInTheDocument()

		const saveNUpdateButton = component.getByTestId('save-n-update')
		expect(saveNUpdateButton).toBeInTheDocument()
		expect(saveNUpdateButton).toHaveAttribute('type', 'submit')
		expect(saveNUpdateButton).toHaveTextContent('Save & Update')

		act(() => {
			fireEvent.click(saveNUpdateButton)
		})

		waitFor(() => {
			expect(
				component.container.querySelector('form[id="about-user"]')
			).not.toBeInTheDocument()

			expect(component.getByTestId('user-info')).toBeInTheDocument()
		})
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
