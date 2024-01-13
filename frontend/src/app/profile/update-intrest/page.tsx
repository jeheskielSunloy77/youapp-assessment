import { mustGetUser } from '@/actions/user'
import Navbar from '@/components/layout/navbar/Navbar'
import UpdateInterestsForm from './_shared/components/update-interests-form/UpdateInterestsForm'

export default async function UpdateIntrest() {
	const user = await mustGetUser()

	return (
		<div className='background-light min-h-screen pt-28'>
			<Navbar
				rightButton={
					<button
						type='submit'
						form='update-intrest'
						className='button-ghost px-3 py-2.5 text-gradient-blue font-bold'
					>
						Save
					</button>
				}
			/>
			<main className='container mx-auto py-6'>
				<div className='px-4 space-y-8'>
					<div className='space-y-2'>
						<h4 className='font-bold text-gradient-gold text-sm'>
							Tell everyone about your self
						</h4>
						<h1 className='text-2xl font-bold text-black dark:text-white'>
							What interest you?
						</h1>
					</div>
					<UpdateInterestsForm interests={user.interests} />
				</div>
			</main>
		</div>
	)
}
