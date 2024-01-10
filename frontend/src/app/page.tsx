import ButtonIcon from '@/components/buttons/button-icon/ButtonIcon'
import Icon, { IconName } from '@/components/icon/Icon'
import Navbar from '@/components/layout/navbar/Navbar'
import { getUser } from '@/libs/actions'
import dayjs from 'dayjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AboutUser from './_shared/components/about-user/AboutUser'

export default async function Home() {
	const user = await getUser()
	if (!user) return redirect('/login')

	const age = user.birthday
		? dayjs().diff(dayjs(user.birthday), 'year').toString()
		: null

	return (
		<>
			<main className='container mx-auto py-6 min-h-screen mt-16'>
				<Navbar username={`@${user.name}`} />
				<div className='space-y-4 px-4'>
					<div
						style={
							user.avatarUrl
								? { backgroundImage: `url(${user.avatarUrl}?c=${Date.now()})` }
								: undefined
						}
						className='bg-center bg-cover flex items-start justify-end flex-col bg-gray-100 dark:bg-gray-800 rounded-lg h-60 p-2 gap-2'
					>
						<div className='mix-blend-difference'>
							<h6 className='font-bold text-white'>
								@{user.name}
								{age && `, ${age}`}
							</h6>
							{user.gender && (
								<span className='text-sm text-white font-medium'>{user.gender}</span>
							)}
						</div>
						{user.zodiac && user.horoscope && (
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
						)}
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

						<IntrestList interests={user.interests} />
					</div>
				</div>
			</main>
		</>
	)
}

function IntrestList(props: { interests?: string[] }) {
	if (!props.interests)
		return (
			<p className='text-sm text-gray-700 dark:text-gray-400'>
				Add in your interests to find better matches.
			</p>
		)

	return (
		<div className='flex items-center flex-wrap gap-4'>
			{props.interests.map((intrest) => (
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
