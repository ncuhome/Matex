import * as React from "react"
import {SVGProps} from "react";

const TimeIcon = (props:SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={200}
				height={200}
				{...props}
		>
			<path d="M512 832c-176.448 0-320-143.552-320-320s143.552-320 320-320 320 143.552 320 320-143.552 320-320 320m0-704c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384" />
			<path d="M544 505.856V320a32 32 0 0 0-64 0v199.104c0 8.48 3.36 16.64 9.376 22.624l107.296 107.296a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544 505.856z" />
		</svg>
)

export default TimeIcon
