import { ReactNode } from 'react'

export default function ConditionalWrapper({
	condition,
	wrapper,
	children,
}: ConditionalWrapperProps) {
	return <>{condition ? wrapper(children) : children}</>
}

interface ConditionalWrapperProps {
	condition: boolean
	wrapper: (children: ReactNode) => JSX.Element
	children: ReactNode
}
