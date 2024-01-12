'use client'

import Icon from '@/components/icon/Icon'
import { useState } from 'react'

export interface InputTagsProps {
	tags?: string[]
	name?: string
}

export default function InputTags(props: InputTagsProps) {
	const [tags, setTags] = useState(props.tags || [])

	function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && e.currentTarget.value !== '') {
			e.preventDefault()
			const t = e.currentTarget.value.trim()

			if (tags.indexOf(t) === -1) {
				setTags((prev) => [...prev, t])
			}
			e.currentTarget.value = ''
		}
	}

	return (
		<div className='w-full inline-flex gap-1 flex-wrap bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-[rgba(217,217,217,0.06)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
			{tags.map((tag) => (
				<div
					key={tag}
					data-testid='tag-container'
					className='flex items-center gap-2 py-1 px-2 bg-white bg-opacity-10 rounded-sm'
				>
					<input name={props.name} type='hidden' value={tag} />
					{tag}
					<button
						className='button-ghost p-0.5 hover:bg-gray-500'
						onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
					>
						<Icon name='close' className='w-4 h-4' />
					</button>
				</div>
			))}
			<input
				role='textbox'
				type='text'
				className={`border-none outline-none bg-transparent ${
					tags.length ? 'w-1/2' : 'w-full'
				}`}
				onKeyDown={handleOnKeyDown}
			/>
		</div>
	)
}
