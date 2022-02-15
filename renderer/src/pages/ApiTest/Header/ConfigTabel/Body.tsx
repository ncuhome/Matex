import { Header, Icon } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import UploadFile from '../../../../components/UploadFile';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyRawAtom,
  apiTestBodyUrlencodedAtom,
  apiTestMethodAtom,
  useApiTestConfig
} from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import MonacoEditor from '/@cmp/MonacoEditor';
import { useUpdateEditorValue } from '/@/store/commonStore';
import styles from './index.module.scss';
import { BodyFormData } from '/@/pages/ApiTest/Header/ConfigTabel/BodyFormData';

const BodyTable = () => {
  const [
    urlencodedList,
    updateUrlencodedKey,
    updateUrlencodedValue,
    addUrlencodedItem,
    deleteUrlencodedItem
  ] = useApiTestConfig(apiTestBodyUrlencodedAtom);
  const method = useAtomValue(apiTestMethodAtom);
  const activeBody = useAtomValue(apiTestActiveBodyTypeAtom);
  const activeRawType = useAtomValue(apiTestBodyRawAtom);
  const setEditorValue = useUpdateEditorValue('configBody');

  useEffect(() => {
    const len = urlencodedList.length;
    if (len === 0 || (urlencodedList[len - 1].key.trim() && urlencodedList[len - 1].value)) {
      addUrlencodedItem({ key: '', value: '' });
    }
  }, [urlencodedList]);

  if (method === 'Get') {
    return (
      <div className={styles.warningCon}>
        <Header icon>
          <Icon name={'warning sign'} color={'red'} style={{ marginBottom: 10 }} />
          &nbsp;当为{method}请求时,请使用Params传递参数
        </Header>
      </div>
    );
  } else {
    if (activeBody === 'binary') {
      return <UploadFile />;
    } else if (activeBody === 'raw') {
      const language = LanguageMapper.get(activeRawType) ?? 'text/plain';
      console.log(language);
      return (
        <MonacoEditor
          onChange={(changes, value) => {
            console.log(value);
            setEditorValue(value ?? '');
          }}
          shadow={false}
          readOnly={false}
          border={'#E0E1E2 1px solid'}
          name={'configBody'}
          language={language}
          defaultVal={''}
          height={130}
          width={'100%'}
        />
      );
    } else if (activeBody === 'urlencoded') {
      return (
        <KVTable
          data={urlencodedList}
          onChangeValue={updateUrlencodedValue}
          onChangeKey={updateUrlencodedKey}
          onDeleteLine={deleteUrlencodedItem}
        />
      );
    } else {
      return <BodyFormData />;
    }
  }
};

export default BodyTable;
