import * as React from "react"
import {SVGProps} from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
		<svg
				className="svgIcon"
				viewBox="0 0 1024 1024"
				xmlns="http://www.w3.org/2000/svg"
				width={200}
				height={200}
				{...props}
		>
			<path d="M761.6 701.44a21.333 21.333 0 0 1 0 30.293L731.733 761.6a21.333 21.333 0 0 1-30.293 0L512 572.16 322.56 761.6a21.333 21.333 0 0 1-30.293 0L262.4 731.733a21.333 21.333 0 0 1 0-30.293L451.84 512 262.4 322.56a21.333 21.333 0 0 1 0-30.293l29.867-29.867a21.333 21.333 0 0 1 30.293 0L512 451.84 701.44 262.4a21.333 21.333 0 0 1 30.293 0l29.867 29.867a21.333 21.333 0 0 1 0 30.293L572.16 512z" />
		</svg>
)

export default CloseIcon
