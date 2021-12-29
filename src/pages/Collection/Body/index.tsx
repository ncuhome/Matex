import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import styles from './index.module.scss';
import MonacoEditor from '../../../components/MonacoEditor';
import { MatexWin } from '../../../global';
import { myEmitter } from '../../../utils/EventEmiter';
import type { IpcRendererEvent } from 'electron';
import { LanguageMapper } from '../../../components/MonacoEditor/utils';
import { Actions, FormatOptions } from '../../../Model/collection.model';

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
    myEmitter.emit('monacoEditor-collect', MatexWin.decodeHTML5(args));
  };

  useEffect(() => {
    MatexWin.ipc?.on('collection_res', listen);
    return () => {
      MatexWin.ipc?.removeListener('collection_res', listen);
    };
  }, []);

  const renderActions = () => {
    return (
      <Menu secondary>
        {Actions.map((item) => {
          return (
            <Fragment key={item}>
              <Menu.Item name={item} active={activeItem === item} onClick={handleItemClick} />
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
        name={'collect'}
        language={LanguageMapper.get(method)!}
        defaultVal={''}
        height={240}
        width={'100%'}
      />
    </div>
  );
};

export default Body;
