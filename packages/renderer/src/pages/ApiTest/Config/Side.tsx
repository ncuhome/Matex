import React from "react"
import styles from "/@/pages/ApiTest/Config/index.module.scss";
import MyDropDown from "/@cmp/DropDown";
import {SelConfigs} from "/@/Model/ApiTest.model";
import {useAtom} from "jotai";
import {SelConfig} from "/@/store/ApiTest/config.store";

const ConfigSide = () => {
	const [selConfig, setSelConfig] = useAtom(SelConfig);

	const changeSelConfig = (index,sel: any) => setSelConfig(sel);
	return (
			<div className={styles.side}>
				<MyDropDown width={98} menus={SelConfigs} selectedKey={selConfig} onSelectionChange={changeSelConfig}/>
			</div>
	)
}

export default ConfigSide
