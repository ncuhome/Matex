import * as React from "react"
import {SVGProps} from "react";

const AddIcon = (props: SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={200}
				height={200}
				{...props}
		>
			<path d="M874.667 469.333h-320v-320c0-23.466-19.2-42.666-42.667-42.666s-42.667 19.2-42.667 42.666v320h-320c-23.466 0-42.666 19.2-42.666 42.667s19.2 42.667 42.666 42.667h320v320c0 23.466 19.2 42.666 42.667 42.666s42.667-19.2 42.667-42.666v-320h320c23.466 0 42.666-19.2 42.666-42.667s-19.2-42.667-42.666-42.667z" />
		</svg>
)

export default AddIcon
