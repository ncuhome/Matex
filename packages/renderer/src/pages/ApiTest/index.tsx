import React from "react"
import styles from './index.module.scss';
import Config from "/@/pages/ApiTest/Config";
import ReqResult from "/@/pages/ApiTest/Result";

const ApiTest = () => {
	return (
			<div className={styles.con}>
				<div className={styles.config}>
					<Config/>
				</div>
				<div className={styles.side}>
				</div>
				<div className={styles.res}>
					<ReqResult/>
				</div>
			</div>
	)
}

export default ApiTest
