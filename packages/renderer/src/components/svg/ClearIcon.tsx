import * as React from "react"
import {SVGProps} from "react";

const ClearIcon = (props:SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={25}
				height={25}
				{...props}
		>
			<path d="M512 981.333c259.2 0 469.333-210.133 469.333-469.333S771.2 42.667 512 42.667 42.667 252.8 42.667 512 252.8 981.333 512 981.333zm214.827-261.845a64 64 0 0 1-90.454 1.579L513.58 602.496 395.008 725.248a64 64 0 0 1-92.075-88.917l118.571-122.752-122.837-118.571a64 64 0 1 1 88.96-92.075L510.42 421.504 628.95 298.752a64 64 0 0 1 92.118 88.917L602.453 510.421l122.795 118.571a64 64 0 0 1 1.579 90.453z" />
		</svg>
)

export default ClearIcon
