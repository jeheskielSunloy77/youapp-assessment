'use client'
import { User } from '@/libs/types'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import io, { Socket } from 'socket.io-client'

interface Chat {
	message: string
	attachmentUrl?: string
	user: User
}

export default function Chat(props: { token: string }) {
	const [chats, setChats] = useState<Chat[]>([])
	const socket = useRef<Socket>()

	useEffect(() => {
		socket.current = io(process.env.BACKEND_URL as string, {
			extraHeaders: {
				Authorization: 'Bearer ' + props.token,
			},
		})

		socket.current.on('connect', () => {
			socket.current?.emit('getAllMessages')
		})

		socket.current.on('receiveMessage', (msg) =>
			setChats((msgs) => [...msgs, msg])
		)

		socket.current.on('receiveAllMessages', (msgs) => setChats(msgs))

		socket.current.on('exception', (data) =>
			console.error('Received exception:', data)
		)

		socket.current?.onAnyOutgoing((event) => {
			console.log('outgoing', event)
		})

		return () => {
			socket.current?.disconnect()
		}
	}, [])
	return (
		<div className='text-white min-h-screen'>
			<h1>Chat room</h1>
			{chats.map((chat) => (
				<div key={chat.message}>
					{chat.user?.name}: {chat.message}
					{chat.attachmentUrl && (
						<a
							href={chat.attachmentUrl}
							className='ml-2 bg-gray-400 px-2 py-1 rounded-md'
						>
							<button>Download attachment</button>
						</a>
					)}
				</div>
			))}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const message = e.currentTarget.message.value
					const file = e.currentTarget.attachment.files[0]

					if (!file) return socket.current?.emit('sendMessage', { message })

					if (file.size > 1024 * 1024 * 1)
						return toast.error('File size must be less than 1MB')

					const reader = new FileReader()
					reader.readAsDataURL(file)
					reader.onload = (e) => {
						socket.current?.emit('sendMessage', {
							message,
							attachment: e.target?.result,
						})
					}
				}}
			>
				<input
					type='text'
					name='message'
					className='text-black'
					placeholder='enter message'
					required
				/>
				<input type='file' name='attachment' />
			</form>
		</div>
	)
}
