import React, { useEffect } from 'react';
import { useApiTestConfig, apiTestParamsAtom } from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';

const ParamsTable = () => {
  const [paramList, updateParamKey, updateParamValue, addApiTestParam, deleteApiTestParam] =
    useApiTestConfig(apiTestParamsAtom);

  useEffect(() => {
    const len = paramList.length;
    if (len === 0 || (paramList[len - 1].key.trim() && paramList[len - 1].value)) {
      addApiTestParam({ key: '', value: '' });
    }
  }, [paramList]);

  return (
    <KVTable
      data={paramList}
      onChangeValue={updateParamValue}
      onChangeKey={updateParamKey}
      onDeleteLine={deleteApiTestParam}
    />
  );
};

export default ParamsTable;
