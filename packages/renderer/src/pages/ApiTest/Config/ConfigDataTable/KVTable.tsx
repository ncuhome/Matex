import { useAtomValue } from 'jotai';
import { ReqBodyType, ReqConfigType, useConfigList } from '/@/store/ApiTest/config.store';
import KVTable from '/@cmp/Table';
import React from 'react';
import { ConfigType } from '/@/Model/ApiTest.model';

export const RenderKVTable = () => {
  const reqBodyType = useAtomValue(ReqBodyType);
  const selConfig = useAtomValue(ReqConfigType);

  const _accept = reqBodyType === 'form-data' || reqBodyType === 'urlencoded';
  const { configList, updateConfig, deleteConfig } = useConfigList(
    selConfig as Exclude<ConfigType, 'auth'>,
    _accept ? reqBodyType : 'urlencoded'
  );

  const onChangeCell = (rowIndex, key, value) => {
    updateConfig(rowIndex, key, value);
  };

  return (
    <KVTable
      file={reqBodyType === 'form-data'}
      type={selConfig}
      data={configList}
      onChangeCell={onChangeCell}
      onRightAction={(e, index) => configList.length !== 1 && deleteConfig(index)}
    />
  );
};
