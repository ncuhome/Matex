import React from "react"
import styles from "/@/pages/ApiTest/Config/index.module.scss";
import MyDropDown from "/@cmp/DropDown";
import {SelConfigs} from "/@/Model/ApiTest.model";
import {useAtom} from "jotai";
import {ReqConfigType} from "/@/store/ApiTest/config.store";

const ConfigSide = () => {
	const [reqConfigType, setReqConfigType] = useAtom(ReqConfigType);

	const changeSelConfig = (index,sel: any) => setReqConfigType(sel);
	return (
			<div className={styles.side}>
				<MyDropDown width={98} menus={SelConfigs} selectedKey={reqConfigType} onSelectionChange={changeSelConfig}/>
			</div>
	)
}

export default ConfigSide
