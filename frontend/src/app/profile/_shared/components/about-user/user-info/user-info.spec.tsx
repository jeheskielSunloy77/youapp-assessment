import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ComponentProps } from 'react'
import { UserInfo } from './UserInfo'

const bio: ComponentProps<typeof UserInfo>['bio'] = {
	birthday: new Date('2000-12-12'),
	horoscope: 'Dog',
	height: 183,
	weight: 70,
	zodiac: 'Capricorn',
}

describe('UserInfo', () => {
	it('shuld render a list of user info when provided bio', () => {
		const { container } = render(<UserInfo bio={bio} />)
		const list = container.querySelector('ul[data-testid="user-info"]')
		expect(list).toBeInTheDocument()

		const listItems = container.querySelectorAll('li')
		expect(listItems).toHaveLength(5)
	})
	it('should render a message when no bio is provided', () => {
		const { container } = render(<UserInfo bio={{}} />)
		const message = container.querySelector('p')
		expect(message).toBeInTheDocument()
		expect(message).toHaveTextContent(
			'Add in yours to help others know you better.'
		)
	})

	it('should render the user list with correct items', () => {
		const { container } = render(<UserInfo bio={bio} />)
		const listItems = container.querySelectorAll('li')

		expect(listItems).toHaveLength(5)

		expect(listItems[0]).toHaveTextContent(`Birthday: 12 / 12 / 2000 (Age23)`)
		expect(listItems[1]).toHaveTextContent(`Horoscope: ${bio.horoscope}`)
		expect(listItems[2]).toHaveTextContent(`Zodiac: ${bio.zodiac}`)
		expect(listItems[3]).toHaveTextContent(`Height: ${bio.height}`)
		expect(listItems[4]).toHaveTextContent(`Weight: ${bio.weight}`)
	})

	it('should match snapshot', () => {
		expect(render(<UserInfo bio={bio} />).container).toMatchSnapshot()
	})
})
