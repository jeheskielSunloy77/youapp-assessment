import { getUser } from '@/actions/user'
import Icon, { IconName } from '@/components/icon/Icon'
import Navbar from '@/components/layout/navbar/Navbar'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AboutUser from './_shared/components/about-user/AboutUser'

export const metadata: Metadata = { title: 'User profile' }

export default async function ProfilePage() {
	const user = await getUser()
	if (!user) return redirect('/login')

	const age = user.birthday
		? dayjs().diff(dayjs(user.birthday), 'year').toString()
		: null

	return (
		<div className='min-h-screen pt-16 background-dark'>
			<Navbar username={`@${user.name}`} />
			<main className='container mx-auto py-6'>
				<div className='space-y-4 px-4'>
					<div className='flex items-start justify-end flex-col bg-gray-100 dark:bg-[rgba(22,35,41,1)] rounded-lg h-60 md:h-[480px] p-2 md:p-4 gap-2  relative'>
						{user.avatarUrl && (
							<>
								<Image
									src={user.avatarUrl}
									alt=''
									className='w-full h-full absolute top-0 left-0 rounded-lg object-center object-cover'
									width={1000}
									height={500}
								/>
								<div className='w-full h-full absolute top-0 left-0 rounded-lg bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.76)_0%,_rgba(0,_0,_0,_0)_45.83%,_black_100%)]' />
							</>
						)}
						<div className='text-gray-100 z-10'>
							<h6 className='font-bold'>
								@{user.name}
								{age && `, ${age}`}
							</h6>
							{user.gender && (
								<span className='text-sm font-medium'>{user.gender}</span>
							)}
						</div>
						{user.zodiac && user.horoscope && (
							<div className='flex items-center gap-4 text-black dark:text-white font-semibold text-xs z-10'>
								<div className='p-2 rounded-full bg-gray-200 dark:bg-opacity-80 dark:bg-gray-900 flex items-center gap-4'>
									<Icon
										name={`zodiac-${user.zodiac.toLowerCase()}` as IconName}
										className='w-4 h-4 sm:w-6 sm:h-6'
									/>
									{user.zodiac}
								</div>
								<div className='p-2 rounded-full bg-gray-200 dark:bg-opacity-80 dark:bg-gray-900 flex items-center gap-4'>
									<Icon name='dog-side' className='w-4 h-4 sm:w-6 sm:h-6' />
									{user.horoscope}
								</div>
							</div>
						)}
					</div>
					<AboutUser user={user} />
					<div className='bg-gray-100 dark:bg-[rgba(14,25,31,1)] rounded-lg p-4 space-y-4'>
						<div className='flex items-center justify-between'>
							<h3 className='font-semibold text-black dark:text-white'>Intrest</h3>
							<Link href='/profile/update-intrest'>
								<button className='button-ghost'>
									<Icon
										name='pencil-outline'
										className='w-4 h-4 text-gray-700 dark:text-gray-200'
									/>
								</button>
							</Link>
						</div>

						<IntrestList interests={user.interests} />
					</div>
				</div>
			</main>
		</div>
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
		<ul className='flex items-center flex-wrap gap-4'>
			{props.interests.map((intrest) => (
				<li
					key={intrest}
					className='py-2 px-4 rounded-full bg-gray-200 dark:bg-opacity-[0.06]  text-black dark:text-white font-semibold'
				>
					{intrest}
				</li>
			))}
		</ul>
	)
}
