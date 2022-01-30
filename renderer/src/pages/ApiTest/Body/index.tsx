import React, { Fragment, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import styles from './index.module.scss';
import MonacoEditor from '/@cmp/MonacoEditor';
import { MatexWin } from '/@/global';
import { myEmitter } from '/@/utils/EventEmiter';
import type { IpcRendererEvent } from 'electron';
import { LanguageMapper } from '/@/components/MonacoEditor/utils';
import { Actions, FormatOptions, ResDisplayItems } from '/@/model/apiTest.model';
import { ApiTest_Channel } from '/@common/ipc/channel';
import { FormatType, ResDisplayItemsType } from '/@/type/apiTest';
import clsx from 'clsx';

const Body = () => {
  const [activeItem, setActiveItem] = useState('Pretty');
  const [method, setMethod] = useState<FormatType>('JSON');
  const [displayItem, setDisplayItem] = useState<ResDisplayItemsType>('Body');

  const formatOptions = FormatOptions.map((item) => {
    return { key: item, value: item, text: item };
  });
  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const listen = (e: IpcRendererEvent, args: any[] | string) => {
    console.log(args);
    myEmitter.emit('monacoEditor-apiTest', MatexWin.decodeHTML5(args));
  };

  useEffect(() => {
    MatexWin.ipc?.on(ApiTest_Channel.Response, listen);
    return () => {
      MatexWin.ipc?.removeListener(ApiTest_Channel.Response, listen);
    };
  }, []);

  const renderActions = () => {
    const style = {
      background: '#228C86',
      color: '#FFF'
    };
    return (
      <>
        <Label ribbon as="a" color={'blue'} style={{ marginLeft: 15 }}>
          响应数据
        </Label>
        <Menu secondary style={{ marginTop: -4 }}>
          {Actions.map((item) => {
            const active = activeItem === item;
            return (
              <Fragment key={item}>
                <Menu.Item
                  style={active ? style : {}}
                  name={item}
                  active={active}
                  onClick={handleItemClick}
                />
              </Fragment>
            );
          })}
          <Menu.Menu position="right">
            <Menu.Item>
              <Button.Group>
                <Button>{method}</Button>
                <Dropdown
                  onChange={handleChange}
                  className="button icon"
                  floating
                  options={formatOptions}
                  trigger={<></>}
                />
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </>
    );
  };

  return (
    <div className={styles.con}>
      <div className={styles.operationCon}>
        {ResDisplayItems.map((item) => {
          const active = displayItem === item;
          return (
            <Fragment key={item}>
              <div
                className={clsx([styles.btn, active && styles.active])}
                onClick={() => setDisplayItem(item)}
              >
                {item}
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className={styles.editorCon}>
        <MonacoEditor
          shadow={true}
          border={'transparent 1px solid'}
          actions={renderActions()}
          name={'apiTest'}
          language={LanguageMapper.get(method)!}
          defaultVal={''}
          height={200}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default Body;
