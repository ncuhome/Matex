import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import styles from './index.module.scss';
import MonacoEditor from '../../../components/MonacoEditor';
import { Window } from '../../../type';
import { myEmitter } from '../../../utils/EventEmiter';
import type { IpcRendererEvent } from 'electron';

const Body = () => {
  const [activeItem, setActiveItem] = useState('Pretty');
  const [method, setMethod] = useState('JSON');

  const methodOptions = [
    { key: 'HTML', value: 'HTML', text: 'HTML' },
    { key: 'JSON', value: 'JSON', text: 'JSON' },
    { key: 'Text', value: 'Text', text: 'Text' }
  ];

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const listen = (e: IpcRendererEvent, args: any[]) => {
    console.log(args);
    myEmitter.emit('monacoEditor-collect', JSON.stringify(args));
  };

  useEffect(() => {
    console.log('渲染次数');
    Window.ipc.on('collection_res', listen);
    return () => {
      Window.ipc.removeListener('collection_res', listen);
    };
  }, []);

  const renderActions = () => {
    return (
      <Menu secondary>
        <Menu.Item name="Pretty" active={activeItem === 'Pretty'} onClick={handleItemClick} />
        <Menu.Item name="Raw" active={activeItem === 'Raw'} onClick={handleItemClick} />
        <Menu.Item name="Preview" active={activeItem === 'Preview'} onClick={handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Button.Group>
              <Button>{method}</Button>
              <Dropdown
                onChange={handleChange}
                className="button icon"
                floating
                options={methodOptions}
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
        actions={renderActions()}
        name={'collect'}
        language={'json'}
        defaultVal={''}
        height={255}
        width={'100%'}
      />
    </div>
  );
};

export default Body;
