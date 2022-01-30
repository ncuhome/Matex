import React, { Fragment, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, Label, Menu, Popup } from 'semantic-ui-react';
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
  const [formatType, setFormatType] = useState<FormatType>('JSON');
  const [displayItem, setDisplayItem] = useState<ResDisplayItemsType>('Body');

  const formatOptions = FormatOptions.map((item) => {
    return { key: item, value: item, text: item };
  });
  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  const handleChangeFormat = (event: SyntheticEvent, { value }: any) => {
    setFormatType(value);
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
    let labelText = '';
    switch (displayItem) {
      case 'Body':
        labelText = '响应数据';
        break;
      case 'Headers':
        labelText = '响应头';
        break;
      case 'Cookies':
        labelText = 'Cookie';
        break;
      default:
        labelText = '响应数据';
        break;
    }
    return (
      <>
        <Popup
          on="click"
          position={'bottom center'}
          pinned
          trigger={
            <Label ribbon as="a" color={'blue'} style={{ marginLeft: 15 }}>
              {labelText}
            </Label>
          }
        >
          <Button.Group vertical>
            {ResDisplayItems.map((item) => {
              const active = item === displayItem;
              return (
                <Fragment key={item}>
                  <Button className={clsx([active && styles.active])} onClick={() => setDisplayItem(item)}>
                    {item}
                  </Button>
                </Fragment>
              );
            })}
          </Button.Group>
        </Popup>
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
          <Menu.Menu position="right" style={{ marginLeft: -10 }}>
            <Menu.Item>
              <Button.Group>
                <Button>{formatType}</Button>
                <Dropdown
                  onChange={handleChangeFormat}
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
      <div className={styles.editorCon}>
        <MonacoEditor
          shadow={true}
          border={'transparent 1px solid'}
          actions={renderActions()}
          name={'apiTest'}
          language={LanguageMapper.get(formatType)!}
          defaultVal={''}
          height={240}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default Body;
