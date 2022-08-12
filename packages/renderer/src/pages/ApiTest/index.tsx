import React from "react"
import styles from './index.module.scss';
import Config from "/@/pages/ApiTest/Config";

const ApiTest = () => {
	return (
			<div className={styles.con}>
				<div className={styles.config}>
					<Config/>
				</div>
				<div className={styles.side}>
				</div>
				<div className={styles.res}></div>
			</div>
	)
}

export default ApiTest
