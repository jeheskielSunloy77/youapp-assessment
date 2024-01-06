import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon from '@/components/icon/Icon'
import Navbar from '@/components/layout/navbar/Navbar'
import { getUser } from '@/libs/actions'
import { User } from '@/libs/types'
import AboutUser from './_shared/components/about-user/AboutUser'

export default async function Home() {
	const user = (await getUser()) || ({} as User)

	return (
		<>
			<main className='container mx-auto py-6 h-screen mt-16'>
				<Navbar username={`@${user.name}`} />
				<div className='space-y-4 px-4'>
					<div className='relative bg-gray-100 dark:bg-gray-800 rounded-lg h-48 p-4'>
						<h6 className='font-bold text-black dark:text-white absolute bottom-4 left-4'>
							@{user.name}
						</h6>
					</div>
					<AboutUser user={user} />
					<div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-4'>
						<div className='flex items-center justify-between'>
							<h3 className='font-semibold text-black dark:text-white'>Intrest</h3>
							<ButtonIcon size='small'>
								<Icon
									name='pencil-outline'
									className='w-4 h-4 text-gray-700 dark:text-gray-200'
								/>
							</ButtonIcon>
						</div>
						<p className='text-sm text-gray-700 dark:text-gray-400'>
							Add in your interests to find better matches.
						</p>
					</div>
				</div>
			</main>
		</>
	)
}
