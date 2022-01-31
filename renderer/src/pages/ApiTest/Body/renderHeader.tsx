import { Button, Dropdown, Label, Menu, Popup } from 'semantic-ui-react';
import styles from './index.module.scss';
import { Actions, FormatOptions, ResDisplayItems } from '/@/model/apiTest.model';
import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import { myEmitter } from '/@/utils/EventEmiter';
import { FormatType, ResDisplayItemsType } from '/@/type/apiTest';
import { apiTestResDataAtom } from '/@/store/apiTestStore';
import { useAtomValue } from 'jotai/utils';
import { StatusCard } from '/@/pages/ApiTest/Body/statusCard';

interface Props {
  formatType: FormatType;
  handleChangeFormat: (event: SyntheticEvent, value: any) => void;
}

export const renderHeader = ({ formatType, handleChangeFormat }: Props) => {
  const [activeAction, setActiveAction] = useState('Pretty');
  const [displayItem, setDisplayItem] = useState<ResDisplayItemsType>('Body');
  const resData = useAtomValue(apiTestResDataAtom);

  const formatOptions = FormatOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  useEffect(() => {
    if (displayItem === 'Body') {
      myEmitter.emit('monacoEditor-apiTest', resData?.body);
    } else {
      myEmitter.emit('monacoEditor-apiTest', JSON.stringify(resData?.headers));
    }
  }, [displayItem]);

  const style = {
    background: '#228C86',
    color: '#FFF'
  };

  const renderLabel = () => {
    return (
      <Popup
        on="click"
        position={'bottom center'}
        pinned
        trigger={
          <Label ribbon as="a" color={'blue'} style={{ marginLeft: 15 }}>
            {getLabel(displayItem)}
          </Label>
        }
      >
        <div className={styles.operationCon}>
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
        </div>
      </Popup>
    );
  };

  const renderActions = () => {
    return (
      <div className={styles.actionsCon}>
        <div>
          <Menu secondary>
            {Actions.map((item) => {
              const active = activeAction === item;
              return (
                <Fragment key={item}>
                  <Menu.Item
                    style={active ? style : {}}
                    name={item}
                    active={active}
                    onClick={(e: any, { name }: any) => {
                      setActiveAction(name);
                    }}
                  />
                </Fragment>
              );
            })}
            <Menu.Menu position="right" style={{ marginLeft: -10 }}>
              <Menu.Item>
                <Button.Group color={'grey'}>
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
        </div>
        <div className={styles.statusCon}>
          <StatusCard />
        </div>
      </div>
    );
  };
  const show = displayItem === 'Body';
  return (
    <>
      {renderLabel()}
      {show && renderActions()}
    </>
  );
};

const getLabel = (item: ResDisplayItemsType) => {
  let labelText = '';
  switch (item) {
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
  return labelText;
};
