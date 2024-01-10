'use client'
import { User } from '@/libs/types'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

let socket: Socket

interface Message {
	message: string
	user: User
}

export default function Chat(props: { token: string }) {
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		socket = io('http://localhost:8080', {
			extraHeaders: {
				Authorization: 'Bearer ' + props.token,
			},
		})

		socket.on('connect', () => {
			socket.emit('getAllMessages')
		})

		socket.on('receiveMessage', (msg) => setMessages((msgs) => [...msgs, msg]))

		socket.on('receiveAllMessages', (msgs) => setMessages(msgs))

		socket.on('exception', (data) => console.error('Received exception:', data))

		return () => {
			socket.disconnect()
		}
	}, [])
	return (
		<div className='text-white min-h-screen'>
			<h1>Chat room</h1>
			{messages.map((message) => {
				return (
					<div key={message.message}>
						{message.user?.name}: {message.message}
					</div>
				)
			})}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					socket.emit('sendMessage', {
						message: e.currentTarget.message.value,
					})
				}}
			>
				<input
					type='text'
					name='message'
					className='text-black'
					placeholder='enter message'
				/>
			</form>
		</div>
	)
}
