import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import styles from './index.module.scss';
import MonacoEditor from '/@cmp/MonacoEditor';
import { MatexWin } from '/@/global';
import { myEmitter } from '/@/utils/EventEmiter';
import type { IpcRendererEvent } from 'electron';
import { LanguageMapper } from '/@/components/MonacoEditor/utils';
import { Actions, FormatOptions } from '/@/model/apiTest.model';
import { ApiTest_Channel } from '/@common/ipc/channel';

const Body = () => {
  const [activeItem, setActiveItem] = useState('Pretty');
  const [method, setMethod] = useState('HTML');

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
      <Menu secondary>
        {Actions.map((item) => {
          const active = activeItem === item;
          return (
            <Fragment key={item}>
              <Menu.Item style={active ? style : {}} name={item} active={active} onClick={handleItemClick} />
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
    );
  };

  return (
    <div className={styles.con}>
      <MonacoEditor
        border={'#E0E1E2 1px solid'}
        actions={renderActions()}
        name={'apiTest'}
        language={LanguageMapper.get(method)!}
        defaultVal={''}
        height={240}
        width={'100%'}
      />
    </div>
  );
};

export default Body;
