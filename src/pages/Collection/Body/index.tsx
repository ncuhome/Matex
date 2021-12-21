import React, { SyntheticEvent, useState } from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import styles from './index.module.scss';
import MonacoEditor from '../../../components/MonacoEditor';

const Body = () => {
  const [activeItem, setActiveItem] = useState('Pretty');
  const [method, setMethod] = useState('Get');

  const methodOptions = [
    { key: 'Get', value: 'Get', text: 'Get' },
    { key: 'Post', value: 'Post', text: 'Post' },
    { key: 'Put', value: 'Put', text: 'Put' },
    { key: 'Delete', value: 'Delete', text: 'Delete' },
    { key: 'Header', value: 'Header', text: 'Header' }
  ];

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' }
  ];

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

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
