'use client'
import Icon from '@/components/icon/Icon'
import { useRouter } from 'next/navigation'

export default function BackButton() {
	const router = useRouter()
	return (
		<button
			role='navigation'
			className='button-ghost font-bold'
			onClick={() => router.back()}
		>
			<Icon name='chevron-up' className='w-6 h-6 -rotate-90' />
			Back
		</button>
	)
}
