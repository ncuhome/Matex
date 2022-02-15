import React, { useEffect } from 'react';
import { useApiTestConfig, apiTestParamsAtom, apiTestMethodAtom } from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';
import { useAtomValue } from 'jotai/utils';
import styles from '/@/pages/ApiTest/Header/ConfigTabel/index.module.scss';
import { Header, Icon } from 'semantic-ui-react';

const ParamsTable = () => {
  const [paramList, updateParamKey, updateParamValue, addApiTestParam, deleteApiTestParam] =
    useApiTestConfig(apiTestParamsAtom);
  const method = useAtomValue(apiTestMethodAtom);

  useEffect(() => {
    const len = paramList.length;
    if (len === 0 || (paramList[len - 1].key.trim() && paramList[len - 1].value)) {
      addApiTestParam({ key: '', value: '' });
    }
  }, [paramList]);

  if (method === 'Get') {
    return (
      <KVTable
        data={paramList}
        onChangeValue={updateParamValue}
        onChangeKey={updateParamKey}
        onDeleteLine={deleteApiTestParam}
      />
    );
  } else {
    return (
      <div className={styles.warningCon}>
        <Header icon>
          <Icon name={'warning sign'} color={'red'} style={{ marginBottom: 10 }} />
          &nbsp;{method}请求时,请使用Body传递参数
        </Header>
      </div>
    );
  }
};

export default ParamsTable;
