import { Icon, Segment } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import UploadFile from '../../../../components/UploadFile';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyFormsAtom,
  apiTestMethodAtom,
  useApiTestConfig
} from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';

const BodyTable = () => {
  const [bodyList, updateListKey, updateListValue, addItem, deleteItem] =
    useApiTestConfig(apiTestBodyFormsAtom);
  const method = useAtomValue(apiTestMethodAtom);
  const activeBody = useAtomValue(apiTestActiveBodyTypeAtom);

  useEffect(() => {
    const len = bodyList.length;
    if (len) {
      if (bodyList[len - 1].key && bodyList[len - 1].value) {
        addItem({ key: '', value: '' });
      }
    }
  }, [bodyList]);

  if (method === 'Get') {
    return (
      <Segment style={{ marginTop: 10 }} color="red" textAlign={'center'}>
        <Icon name={'warning sign'} color={'red'} />
        <span style={{ color: 'red' }}>&nbsp;当为Get请求时,无此配置</span>
      </Segment>
    );
  } else {
    if (activeBody === 'binary') {
      return <UploadFile />;
    }
    return (
      <KVTable
        file
        data={bodyList}
        onChangeValue={updateListValue}
        onChangeKey={updateListKey}
        onDeleteLine={deleteItem}
      />
    );
  }
};

export default BodyTable;
