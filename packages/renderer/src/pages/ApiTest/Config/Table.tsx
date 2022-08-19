import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { Suspense } from 'react';
import styles from '/@/pages/ApiTest/Config/index.module.scss';
import {
  RawConfigValue,
  RawTypeValue,
  ReqBodyType,
  ReqConfigType,
  useConfigList
} from '/@/store/ApiTest/config.store';
import KVTable from '/@cmp/Table';
import { useAtom, useAtomValue } from 'jotai';
import { BodyRawTypes, KVConfig } from '/@/Model/ApiTest.model';
import Loading from '/@cmp/Loading';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';
import { Editor } from '/@cmp/MonacoEditor/type';
import { columns } from '/@/pages/ApiTest/Config/utils';
import MyDropDown from '/@cmp/DropDown';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';

const MonacoEditor = React.lazy(() => import('/@/components/MonacoEditor'));
const ConfigTable = () => {
  const selConfig = useAtomValue(ReqConfigType);
  const reqBodyType = useAtomValue(ReqBodyType);
  const [rawTypeValue, setRawTypeValue] = useAtom(RawTypeValue);
  const [rawConfigValue, setRawConfigValue] = useAtom(RawConfigValue);
  const _accept = reqBodyType === 'form-data' || reqBodyType === 'urlencoded';
  const { setValue, changeLanguage } = useEditorAction({ id: 'reqRawConfig', readOnly: false });
  const editorRef = React.useRef<Editor | null>(null);

  const language = LanguageMapper.get(rawTypeValue) ?? 'text/plain';

  const { configList, updateConfig, deleteConfig } = useConfigList(
    selConfig,
    _accept ? reqBodyType : 'urlencoded'
  );

  const table = useReactTable<KVConfig>({
    data: configList,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const onChangeCell = (rowIndex, colIndex, value) => {
    const prop: 'key' | 'value' = colIndex === 0 ? 'key' : 'value';
    updateConfig(rowIndex, prop, value);
  };

  const onCreated = (editor) => {
    editorRef.current = editor;
    if (editor) {
      setValue({
        language: language,
        editor,
        value: rawConfigValue
      });
    }
  };

  const onChangeRawType = (changes, value) => {
    setRawTypeValue(value);
    editorRef.current && changeLanguage(editorRef.current, LanguageMapper.get(value) ?? 'text/plain');
  };

  const renderComponent = () => {
    if (selConfig === 'body' && reqBodyType === 'raw') {
      return (
        <Suspense fallback={<Loading />}>
          <div className={styles.editorCon}>
            <MonacoEditor
              onChange={(changes, value) => {
                setRawConfigValue(value ?? '');
              }}
              onCreated={onCreated}
              onDestroyed={() => (editorRef.current = null)}
              shadow={true}
              border={'1px solid var(--dart-color2)'}
              readOnly={false}
              language={language}
              defaultVal={''}
              height={130}
              width={'100%'}
            />
            <div className={styles.dropDownBox}>
              <MyDropDown
                menus={BodyRawTypes}
                selectedKey={rawTypeValue}
                onSelectionChange={onChangeRawType}
              />
            </div>
          </div>
        </Suspense>
      );
    } else {
      return (
        <KVTable
          file={reqBodyType === 'form-data'}
          type={selConfig}
          table={table}
          onChangeCell={onChangeCell}
          onRightAction={(e, index) => configList.length !== 1 && deleteConfig(index)}
        />
      );
    }
  };
  return <div className={styles.tableCon}>{renderComponent()}</div>;
};

export default ConfigTable;
