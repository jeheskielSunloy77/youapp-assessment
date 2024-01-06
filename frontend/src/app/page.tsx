import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon, { IconName } from '@/components/icon/Icon'
import Navbar from '@/components/layout/navbar/Navbar'
import { getUser } from '@/libs/actions'
import { User } from '@/libs/types'
import dayjs from 'dayjs'
import Link from 'next/link'
import AboutUser from './_shared/components/about-user/AboutUser'

export default async function Home() {
	const user = (await getUser()) || ({} as User)
	const age = user.birthday
		? dayjs().diff(dayjs(user.birthday), 'year').toString()
		: null

	return (
		<>
			<main className='container mx-auto py-6 min-h-screen mt-16'>
				<Navbar username={`@${user.name}`} />
				<div className='space-y-4 px-4'>
					<div
						style={{
							backgroundImage: `url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
						className='flex items-start justify-end flex-col bg-gray-100 dark:bg-gray-800 rounded-lg h-60 p-2 gap-2'
					>
						<div>
							<h6 className='font-bold text-white'>
								@{user.name}
								{age && `, ${age}`}
							</h6>
							<span className='text-sm text-white font-medium'>{user.gender}</span>
						</div>
						<div className='flex items-center gap-4 text-white font-semibold text-xs'>
							<div className='p-2 rounded-full bg-gray-700 flex items-center gap-4'>
								<Icon
									name={`zodiac-${user.zodiac.toLowerCase()}` as IconName}
									className='w-4 h-4 sm:w-6 sm:h-6'
								/>
								{user.zodiac}
							</div>
							<div className='p-2 rounded-full bg-gray-700 flex items-center gap-4'>
								<Icon name='dog-side' className='w-4 h-4 sm:w-6 sm:h-6' />
								{user.horoscope}
							</div>
						</div>
					</div>
					<AboutUser user={user} />
					<div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-4'>
						<div className='flex items-center justify-between'>
							<h3 className='font-semibold text-black dark:text-white'>Intrest</h3>
							<Link href='/update-intrest'>
								<ButtonIcon>
									<Icon
										name='pencil-outline'
										className='w-4 h-4 text-gray-700 dark:text-gray-200'
									/>
								</ButtonIcon>
							</Link>
						</div>

						<IntrestList intrests={user.intrests} />
					</div>
				</div>
			</main>
		</>
	)
}

function IntrestList(props: { intrests?: string[] }) {
	if (!props.intrests)
		return (
			<p className='text-sm text-gray-700 dark:text-gray-400'>
				Add in your interests to find better matches.
			</p>
		)

	return (
		<div className='flex items-center flex-wrap gap-4'>
			{props.intrests.map((intrest) => (
				<div
					key={intrest}
					className='py-2 px-4 rounded-full bg-gray-700 text-black dark:text-white font-semibold'
				>
					{intrest}
				</div>
			))}
		</div>
	)
}
