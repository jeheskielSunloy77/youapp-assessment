import { AppRouterContextProviderMock } from '@/libs/test-utils/mocks/context-providers/app-router'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { ComponentProps } from 'react'
import EditForm from './EditForm'

const mocks = {
	setIsEditing: jest.fn().mockImplementationOnce((value) => value),
	user: {
		name: 'testusername',
		birthday: new Date('2000-12-12'),
		horoscope: 'Rabbit',
		height: 183,
		weight: 70,
		gender: 'Male',
		zodiac: 'Sagittarius',
	} as const,
}

function renderComponent(props?: Partial<ComponentProps<typeof EditForm>>) {
	return render(
		<AppRouterContextProviderMock>
			<EditForm user={mocks.user} setIsEditing={mocks.setIsEditing} {...props} />
		</AppRouterContextProviderMock>
	)
}
describe('EditForm', () => {
	it('should render a form with 7 inputs', () => {
		const form = renderComponent().container.querySelector(
			'form[id="about-user"]'
		)
		expect(form).toBeInTheDocument()

		if (!form) return

		const inputs = form.querySelectorAll('input')
		expect(inputs).toHaveLength(7)
		const inputAttr = [
			{ name: 'avatar', type: 'file' },
			{ name: 'name', type: 'text' },
			{ name: 'birthday', type: 'date' },
			{ name: 'horoscope', type: 'text', readOnly: true },
			{ name: 'zodiac', type: 'text', readOnly: true },
			{ name: 'height', type: 'number' },
			{ name: 'weight', type: 'number' },
		]

		inputAttr.forEach((attr, i) => {
			expect(inputs[i]).toHaveAttribute('name', attr.name)
			expect(inputs[i]).toHaveAttribute('type', attr.type)
			attr.readOnly && expect(inputs[i]).toHaveAttribute('readonly')
		})

		const selectGender = form.querySelector('select')

		expect(selectGender).toBeInTheDocument()

		const options = selectGender?.querySelectorAll('option')
		if (!options) return
		expect(options).toHaveLength(3)
		expect(options[0]).toHaveAttribute('value', '')
		expect(options[1]).toHaveAttribute('value', 'Male')
		expect(options[2]).toHaveAttribute('value', 'Female')
	})
	it('should render a form with a select element', () => {
		const form = renderComponent().container.querySelector(
			'form[id="about-user"]'
		)
		expect(form).toBeInTheDocument()
		if (!form) return

		const selectGender = form.querySelector('select')
		expect(selectGender).toBeInTheDocument()

		const options = selectGender?.querySelectorAll('option')
		if (!options) return

		expect(options).toHaveLength(3)
		const values = ['', 'Male', 'Female']
		values.forEach((value, i) =>
			expect(options[i]).toHaveAttribute('value', value)
		)
	})

	it('should render the correct values', () => {
		const form = renderComponent().container.querySelector(
			'form[id="about-user"]'
		)
		expect(form).toBeInTheDocument()
		if (!form) return

		expect(form).toHaveFormValues({
			avatar: '',
			name: mocks.user.name,
			birthday: mocks.user.birthday?.toISOString().slice(0, 10),
			horoscope: mocks.user.horoscope,
			zodiac: mocks.user.zodiac,
			height: mocks.user.height,
			weight: mocks.user.weight,
			gender: mocks.user.gender,
		})
	})

	it('should change zodiac and horoscope when birthday changes', () => {
		const form = renderComponent().container.querySelector(
			'form[id="about-user"]'
		)
		expect(form).toBeInTheDocument()
		if (!form) return

		const birthday = form.querySelector('input[name="birthday"]')
		expect(birthday).toBeInTheDocument()

		const zodiac = form.querySelector('input[name="zodiac"]')
		expect(zodiac).toBeInTheDocument()

		const horoscope = form.querySelector('input[name="horoscope"]')
		expect(horoscope).toBeInTheDocument()

		if (!birthday || !zodiac || !horoscope) return

		expect(zodiac).toHaveValue(mocks.user.zodiac)
		expect(horoscope).toHaveValue(mocks.user.horoscope)
		expect(birthday).toHaveValue(mocks.user.birthday?.toISOString().slice(0, 10))

		fireEvent.change(birthday, { target: { value: '2000-01-01' } })

		expect(birthday).toHaveValue('2000-01-01')
		expect(zodiac).toHaveValue('Capricorn')
		expect(horoscope).toHaveValue('Tiger')
	})

	it('should render an element when user is editing and the value is defined', () => {
		const component = renderComponent({
			user: { height: 130 },
		})

		const inputs = component.getAllByTestId('input-with-unit')
		expect(inputs).toHaveLength(2)
		const [inputHeight] = inputs

		expect(inputHeight).toHaveValue(130)

		const unitLabels = component.getAllByTestId('unit-label')
		expect(unitLabels).toHaveLength(1)

		const [heightLabel] = unitLabels

		expect(heightLabel).toHaveTextContent('cm')

		fireEvent.change(inputHeight, { target: { value: '' } })

		expect(heightLabel).not.toBeInTheDocument()
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
