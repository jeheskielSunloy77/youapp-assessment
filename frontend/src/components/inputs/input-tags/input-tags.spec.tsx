import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import InputTags, { InputTagsProps } from './InputTags'

function renderComponent(props?: InputTagsProps) {
	return render(<InputTags name='test' tags={['tag1', 'tag2']} {...props} />)
}

describe('InputTags', () => {
	it('should renders an input text element', () => {
		const input = renderComponent().container.querySelector('input[type="text"]')

		expect(input).toBeInTheDocument()
	})
	it('should renders input tags with proper attributes', () => {
		const tagsArray = ['test-tag1', 'test-tag2']

		const tags = renderComponent({
			tags: tagsArray,
		}).container.querySelectorAll('input[type="hidden"]')

		expect(tags).toHaveLength(2)
		tags.forEach((input, i) => {
			expect(input).toHaveAttribute('name', 'test')
			expect(input).toHaveAttribute('value', tagsArray[i])
		})
	})

	it('should add a tag properly', () => {
		const { container } = renderComponent()
		const input = container.querySelector('input[type="text"]')
		fireEvent.change(input!, { target: { value: 'test-tag' } })
		fireEvent.keyDown(input!, { key: 'Enter' })

		const tags = container.querySelectorAll('input[type="hidden"]')
		expect(tags).toHaveLength(3)
		expect(tags[2]).toHaveAttribute('value', 'test-tag')
	})
	it('should remove a tag properly', () => {
		const { container } = renderComponent()
		const tagContainers = screen.getAllByTestId('tag-container')

		expect(tagContainers).toHaveLength(2)
		fireEvent.click(tagContainers[0].querySelector('button')!)
		const tags = container.querySelectorAll('input[type="hidden"]')
		expect(tags).toHaveLength(1)
		expect(tags[0]).toHaveAttribute('value', 'tag2')
	})

	it('should match snapshot', () => {
		expect(renderComponent().container).toMatchSnapshot()
	})
})
