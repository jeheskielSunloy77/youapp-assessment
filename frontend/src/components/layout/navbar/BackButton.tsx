'use client'
import Button from '@/components/buttons/button/Button'
import Icon from '@/components/icon/Icon'
import { useRouter } from 'next/navigation'

export default function BackButton() {
	const router = useRouter()
	return (
		<Button
			variant='ghost'
			color='secondary'
			size='xSmall'
			onClick={() => router.back()}
		>
			<Icon name='chevron-up' className='w-6 h-6 -rotate-90 ' />
			Back
		</Button>
	)
}
