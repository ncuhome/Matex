import * as React from "react"
import {SVGProps} from "react";

const ThreeDotIcon = (props: SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1026 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={200}
				height={200}
				{...props}
		>
			<path d="M0 510.74a21.676 21.676 0 1 0 221.962 0A21.676 21.676 0 1 0 0 510.74ZM401.951 510.74a21.676 21.676 0 1 0 221.962 0 21.676 21.676 0 1 0-221.962 0ZM803.8969999999999 510.74a21.676 21.676 0 1 0 221.962 0 21.676 21.676 0 1 0-221.963 0Z" />
		</svg>
)

export default ThreeDotIcon
