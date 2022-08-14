import React from "react"
import styles from "./index.module.scss";

export interface CellInputProps {
	rowIndex:number;
	colIndex:number;
	value:string|number;
	onChange?:(rowIndex:number,colIndex:number,value:string)=>void
}


const CellInput:React.FC<CellInputProps> = ({rowIndex,colIndex,value,onChange=()=>{}}) => {

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
		onChange(rowIndex,colIndex,e.target.value)
	}

	return (
			<input value={value} onChange={handleChange} className={styles.cellInput}/>
	)
}

export default CellInput
