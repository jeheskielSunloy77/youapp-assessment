'use client'
import InputTags from '@/components/inputs/input-tags/InputTags'
import { updateUser } from '@/libs/actions'
import toast from 'react-hot-toast'

export default function UpdateInterestsForm(props: { interests: string[] }) {
	return (
		<form
			id='update-intrest'
			action={(formData) => {
				toast.promise(updateUser(formData), {
					loading: 'Updating...',
					success: 'Updated!',
					error: 'Failed to update',
				})
			}}
		>
			<InputTags tags={props.interests} name='interests[]' />
		</form>
	)
}
