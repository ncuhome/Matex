import React from 'react';
import styles from '/@/pages/ApiTest/Config/index.module.scss';
import MyDropDown from '/@cmp/DropDown';
import { BodyTypes, SelConfigs } from '/@/Model/ApiTest.model';
import { useAtom } from 'jotai';
import { ReqBodyType, ReqConfigType } from '/@/store/ApiTest/config.store';

const ConfigSide = () => {
  const [reqConfigType, setReqConfigType] = useAtom(ReqConfigType);
  const [reqBodyType, setReqBodyType] = useAtom(ReqBodyType);

  const changeSelConfig = (index, sel: any) => setReqConfigType(sel);
  const changeBodyType = (index, sel: any) => setReqBodyType(sel);
  return (
    <div className={styles.side}>
      <MyDropDown
        width={98}
        menus={SelConfigs}
        selectedKey={reqConfigType}
        onSelectionChange={changeSelConfig}
      />

      {reqConfigType === 'body' && (
        <>
          <div style={{ marginTop: 20 }} />
          <MyDropDown
            large
            width={98}
            menus={BodyTypes}
            selectedKey={reqBodyType}
            btnText={'Body-'+reqBodyType.slice(0,1)}
            onSelectionChange={changeBodyType}
          />
        </>
      )}
    </div>
  );
};

export default ConfigSide;
