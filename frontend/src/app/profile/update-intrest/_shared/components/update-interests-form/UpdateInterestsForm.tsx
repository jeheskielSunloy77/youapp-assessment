'use client'
import { updateUser } from '@/actions/user'
import InputTags from '@/components/inputs/input-tags/InputTags'
import toast from 'react-hot-toast'

export default function UpdateInterestsForm(props: { interests: string[] }) {
	return (
		<form
			id='update-intrest'
			action={(formData) => {
				toast.promise(updateUser(formData), {
					loading: 'Updating data...',
					success: 'Data updated!',
					error: 'Failed to update',
				})
			}}
		>
			<InputTags tags={props.interests} name='interests[]' />
		</form>
	)
}
