import React, { SyntheticEvent, useState } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Icon, Input, Table } from 'semantic-ui-react';
import Tabs from '../Tabs';
import clsx from 'clsx';
import { Window } from '../../../type';

const Header = () => {
  const [method, setMethod] = useState('Get');
  const [url, setUrl] = useState('');

  const countryOptions = [
    { key: 'Get', value: 'Get', text: 'Get' },
    { key: 'Post', value: 'Post', text: 'Post' },
    { key: 'Put', value: 'Put', text: 'Put' },
    { key: 'Delete', value: 'Delete', text: 'Delete' },
    { key: 'Header', value: 'Header', text: 'Header' }
  ];

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const handleClick = () => {
    Window.ipc?.send('collection_fetch', { url, method });
  };

  return (
    <>
      <div className={styles.url}>
        <Button.Group color="teal" className={styles.leftSelect}>
          <Button>{method}</Button>
          <Dropdown
            className={clsx(['button', 'icon'])}
            onChange={handleChange}
            floating
            options={countryOptions}
            trigger={<></>}
          />
        </Button.Group>
        <Input
          value={url}
          size="big"
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          icon={
            <div style={{ display: 'inline', position: 'absolute', right: '6px', top: '6px' }}>
              <Icon name="clipboard outline" circular link />
            </div>
          }
        />
        <Button primary className={styles.startBtn} onClick={handleClick}>
          发送
        </Button>
      </div>
      <div className={styles.config}>
        <div className={styles.leftBtns}>
          <Tabs />
        </div>
        <div className={styles.table}>
          <Table celled striped compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>键</Table.HeaderCell>
                <Table.HeaderCell>值</Table.HeaderCell>
                <Table.HeaderCell>描述</Table.HeaderCell>
                <Table.HeaderCell width={3} textAlign={'center'}>
                  操作
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>First</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <Button icon compact>
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <Button icon compact>
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <Button icon compact>
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Header;
