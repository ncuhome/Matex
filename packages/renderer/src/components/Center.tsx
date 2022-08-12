import React from "react"

interface PropType {
	children:React.ReactNode
	style?:React.CSSProperties|undefined
}

const initStyle = {display:'flex',alignItems:'center',justifyContent:'center'}

const Center:React.FC<PropType> = ({children,style}) => {
	return (
			<div style={{...initStyle,...style}}>
				{children}
			</div>
	)
}

export default Center
