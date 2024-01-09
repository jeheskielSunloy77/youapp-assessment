'use client'

import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'
import { useState } from 'react'

interface Props {
	tags?: string[]
	name?: string
}

export default function InputTags(props: Props) {
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
		<div className='w-full inline-flex gap-1 flex-wrap bg-gray-50 text-gray-900 opacity-80 dark:opacity-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
			{tags.map((tag) => (
				<div
					key={tag}
					className='flex items-center gap-2 py-1 px-2 bg-gray-500 rounded-sm'
				>
					<input name={props.name} type='hidden' value={tag} />
					{tag}
					<ButtonIcon
						size='xSmall'
						onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
					>
						<Icon name='close' className='w-4 h-4' />
					</ButtonIcon>
				</div>
			))}
			<input
				type='text'
				className={`border-none outline-none bg-inherit ${
					tags.length ? 'w-1/2' : 'w-full'
				}`}
				onKeyDown={handleOnKeyDown}
			/>
		</div>
	)
}
