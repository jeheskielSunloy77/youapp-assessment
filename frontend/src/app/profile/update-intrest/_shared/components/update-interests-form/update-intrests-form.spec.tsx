import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import UpdateInterestsForm from './UpdateInterestsForm'

const interests = ['golang', 'typescript']

function renderComponent(props: { interests: string[] }) {
	return render(
		<AppRouterContextProviderMock>
			<UpdateInterestsForm {...props} />
		</AppRouterContextProviderMock>
	)
}
describe('UpdateInterestsForm', () => {
	it('should render a form with correct items', () => {
		const form = renderComponent({ interests }).container.querySelector('form')
		expect(form).toBeInTheDocument()

		if (!form) return
		expect(form).toHaveAttribute('id', 'update-intrest')

		const input = form.querySelector('input[type="text"]')
		expect(input).toBeInTheDocument()
	})
	it('should render interests tags properly', () => {
		const interestTags = renderComponent({
			interests,
		}).container.querySelectorAll('input[type="hidden"]')

		expect(interestTags).toHaveLength(interests.length)

		interestTags.forEach((input, i) => {
			expect(input).toHaveAttribute('name', 'interests[]')
			expect(input).toHaveAttribute('value', interests[i])
		})
	})

	it('should match snapshot', () => {
		expect(renderComponent({ interests }).container).toMatchSnapshot()
	})
})
