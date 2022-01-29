import { Header, Icon, Segment } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import UploadFile from '../../../../components/UploadFile';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyFormsAtom,
  apiTestBodyUrlencodedAtom,
  apiTestMethodAtom,
  useApiTestConfig
} from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';
import { ApiTestKVProps } from '/@/store/apiTestStore/type';

const BodyTable = () => {
  const [formDataList, updateFormDataKey, updateFormDataValue, addFormDataItem, deleteFormDataItem] =
    useApiTestConfig(apiTestBodyFormsAtom);
  const [
    urlencodedList,
    updateUrlencodedKey,
    updateUrlencodedValue,
    addUrlencodedItem,
    deleteUrlencodedItem
  ] = useApiTestConfig(apiTestBodyUrlencodedAtom);
  const method = useAtomValue(apiTestMethodAtom);
  const activeBody = useAtomValue(apiTestActiveBodyTypeAtom);
  const list = activeBody === 'form-data' ? formDataList : urlencodedList;

  const addItem = ({ key, value }: Omit<ApiTestKVProps, 'index'>) => {
    if (activeBody === 'form-data') {
      return addFormDataItem({ key, value });
    } else {
      return addUrlencodedItem({ key, value });
    }
  };

  useEffect(() => {
    const len = list.length;
    if (len) {
      if (list[len - 1].key && list[len - 1].value) {
        addItem({ key: '', value: '' });
      }
    }
  }, [list]);

  const updateListKey = (index: number, key: string) => {
    if (activeBody === 'form-data') {
      updateFormDataKey(index, key);
    } else {
      updateUrlencodedKey(index, key);
    }
  };

  const updateListValue = (index: number, key: string) => {
    if (activeBody === 'form-data') {
      updateFormDataValue(index, key);
    } else {
      updateUrlencodedValue(index, key);
    }
  };

  const deleteItem = (index: number) => {
    if (activeBody === 'form-data') {
      return deleteFormDataItem(index);
    } else {
      return deleteUrlencodedItem(index);
    }
  };
  if (method === 'Get') {
    return (
      <Segment placeholder style={{ marginTop: -40 }}>
        <Header icon>
          <Icon name={'warning sign'} color={'red'} />
          &nbsp;当为Get请求时,无此配置
        </Header>
      </Segment>
    );
  } else {
    if (activeBody === 'binary') {
      return <UploadFile />;
    }
    return (
      <KVTable
        file={activeBody === 'form-data'}
        data={list}
        onChangeValue={updateListValue}
        onChangeKey={updateListKey}
        onDeleteLine={deleteItem}
      />
    );
  }
};

export default BodyTable;
