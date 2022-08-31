import * as React from "react"
import {SVGProps} from "react";

const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={200}
				height={200}
				{...props}
		>
			<path
					d="M857.6 956.8H166.4C112 956.8 64 908.8 64 851.2V668.8c0-19.2 12.8-32 32-32s32 12.8 32 32v182.4c0 22.4 16 41.6 38.4 41.6h694.4c19.2 0 38.4-19.2 38.4-41.6V668.8c0-19.2 12.8-32 32-32s32 12.8 32 32v182.4c-3.2 57.6-48 105.6-105.6 105.6z"
			/>
			<path
					d="M512 758.4c-19.2 0-32-12.8-32-32v-640c0-19.2 12.8-32 32-32s32 12.8 32 32v640c0 16-12.8 32-32 32z"
			/>
			<path
					d="M512 764.8c-9.6 0-16-3.2-22.4-9.6l-208-208c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 688l185.6-185.6c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-208 208c-6.4 6.4-12.8 9.6-22.4 9.6z"
			/>
		</svg>
)

export default DownloadIcon
