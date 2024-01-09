import Button from '@/components/buttons/button/Button'
import Navbar from '@/components/layout/navbar/Navbar'
import { getUser, updateUserIntrest } from '@/libs/actions'
import InputTags from '../../components/inputs/input-tags/InputTags'

export default async function UpdateIntrest() {
	const user = await getUser()

	return (
		<>
			<main className='container mx-auto py-6 h-screen mt-28'>
				<Navbar
					rightButton={
						<Button variant='ghost' type='submit' form='update-intrest'>
							Save
						</Button>
					}
				/>
				<div className='px-4 space-y-8'>
					<div className='space-y-2'>
						<p className='font-bold text-amber-500 text-sm'>
							Tell everyone about your self
						</p>
						<h1 className='text-2xl font-bold text-black dark:text-white'>
							What interest you?
						</h1>
					</div>
					<form id='update-intrest' action={updateUserIntrest}>
						<InputTags tags={user?.intrests} name='intrests' />
					</form>
				</div>
			</main>
		</>
	)
}
