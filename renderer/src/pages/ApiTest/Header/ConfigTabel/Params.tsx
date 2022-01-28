import React, { Fragment, useEffect } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import styles from './index.module.scss';
import { useApiTestConfig, apiTestParamsAtom } from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';

const ParamsTable = () => {
  const [paramList, updateParamKey, updateParamValue, addApiTestParam, deleteApiTestParam] =
    useApiTestConfig(apiTestParamsAtom);

  useEffect(() => {
    const len = paramList.length;
    if (len) {
      if (paramList[len - 1].key.trim() && paramList[len - 1].value) {
        addApiTestParam({ key: '', value: '' });
      }
    }
  }, [paramList]);

  return (
    <KVTable
      file
      data={paramList}
      onChangeValue={updateParamValue}
      onChangeKey={updateParamKey}
      onDeleteLine={deleteApiTestParam}
    />
  );
};

export default ParamsTable;
