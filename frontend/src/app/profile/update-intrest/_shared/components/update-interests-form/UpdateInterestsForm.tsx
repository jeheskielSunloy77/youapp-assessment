'use client'
import { updateUser } from '@/actions/user'
import InputTags from '@/components/inputs/input-tags/InputTags'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function UpdateInterestsForm(props: { interests: string[] }) {
	const router = useRouter()
	return (
		<form
			id='update-intrest'
			action={(formData) => {
				toast.promise(updateUser(formData), {
					loading: 'Updating data...',
					success: () => {
						router.push('/profile')
						return 'Data updated!'
					},
					error: 'Failed to update',
				})
			}}
		>
			<InputTags tags={props.interests} name='interests[]' />
		</form>
	)
}
