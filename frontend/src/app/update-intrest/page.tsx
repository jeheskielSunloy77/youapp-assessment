import Button from '@/components/buttons/button/Button'
import Navbar from '@/components/layout/navbar/Navbar'
import { getUser } from '@/libs/actions'
import UpdateInterestsForm from './_shared/components/update-interests-form/UpdateInterestsForm'

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
					<UpdateInterestsForm interests={user.interests} />
				</div>
			</main>
		</>
	)
}
