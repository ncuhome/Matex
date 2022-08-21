import React from 'react';
import styles from './index.module.scss';
import {NotifyIllustration} from "/@cmp/Illustration/notify";
import {ResDataTypeAtom, ResDisplayTypeAtom} from "/@/store/ApiTest/config.store";
import {ResDataType, ResDataTypeList, ResDisplayTypeList, SelConfigs} from "/@/Model/ApiTest.model";
import MyDropDown from "/@cmp/DropDown";
import {useAtom} from "jotai";
import Tabs from "/@cmp/Tabs";

// const MonacoEditor = React.lazy(()=>import('/@/components/MonacoEditor'))

const ReqResult = () => {
  const [resDataType,setResDataType] = useAtom(ResDataTypeAtom)
  const [ResDisplayType,setResDisplayType] = useAtom(ResDisplayTypeAtom)

  return (
    <div className={styles.result}>
      <div className={styles.header}>
        <MyDropDown
            width={102}
            menus={ResDataTypeList}
            selectedKey={resDataType}
            onSelectionChange={(_,sel)=>setResDataType(sel as ResDataType)}
        />
        <Tabs menus={ResDisplayTypeList} selectedKey={ResDisplayType} onSelect={(_,sel)=>setResDisplayType(sel)}/>
      </div>
    </div>
  );
};

export default ReqResult;
