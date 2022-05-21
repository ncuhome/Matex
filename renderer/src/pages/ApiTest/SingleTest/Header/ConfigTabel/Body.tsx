import { Header, Icon } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import UploadFile from '/@cmp/UploadFile';
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
import { useEditors, useEditorValue } from '/@/store/commonStore';
import styles from './index.module.scss';
import { BodyFormData } from '/@/pages/ApiTest/SingleTest/Header/ConfigTabel/BodyFormData';
import { Editor } from '/@cmp/MonacoEditor/type';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';

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
  const { editorValue, setEditorValue } = useEditorValue('configBody');
  const editorRef = React.useRef<Editor | null>();
  const { addEditor, deleteEditor } = useEditors();
  const { setValue, changeLanguage } = useEditorAction({ id: 'configBody', readOnly: false });

  const language = LanguageMapper.get(activeRawType) ?? 'text/plain';

  const onCreated = (editor: Editor) => {
    if (editor) {
      setValue({
        editor,
        value: editorValue ?? '',
        language
      });
      editorRef.current = editor;
      addEditor({ name: 'configBody', editor });
    }
  };

  const onDestroyed = () => {
    editorRef.current = null;
    deleteEditor('configBody');
  };

  useEffect(() => {
    if (editorRef.current) {
      changeLanguage(editorRef.current, language);
    }
  }, [activeRawType]);

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
          <Icon name={'warning sign'} color={'olive'} style={{ marginBottom: 10 }} />
          <span style={{ color: 'var(--text-color)' }}>
            当为&nbsp;<span style={{ color: '#51B6F1' }}>{method}</span>&nbsp;请求时,请使用Params传递参数
          </span>
        </Header>
      </div>
    );
  } else {
    if (activeBody === 'binary') {
      return <UploadFile />;
    } else if (activeBody === 'raw') {
      return (
        <MonacoEditor
          onChange={(changes, value) => {
            setEditorValue(value ?? '');
          }}
          onCreated={onCreated}
          onDestroyed={onDestroyed}
          shadow={false}
          readOnly={false}
          border={'#E0E1E2 1px solid'}
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
