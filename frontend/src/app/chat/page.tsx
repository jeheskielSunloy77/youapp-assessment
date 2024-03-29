import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Chat from './Chat'

export default function ChatPage() {
	const token = cookies().get('token')?.value
	if (!token) redirect('/login')

	return <Chat token={token} />
}
