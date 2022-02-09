import { Button, Dropdown, Label, Menu, Popup } from 'semantic-ui-react';
import styles from './index.module.scss';
import { Actions, FormatOptions, ResDisplayItems } from '/@/model/apiTest.model';
import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Emitter } from '/@/utils/EventEmiter';
import { ResDisplayItemsType } from '/@/type/apiTest';
import { apiTestBodyFormatAtom, apiTestResDataAtom } from '/@/store/apiTestStore';
import { useAtomValue } from 'jotai/utils';
import { StatusCard } from '/@/pages/ApiTest/Body/StatusCard';
import { useAtom } from 'jotai';
import { judgementType } from '/@/utils/typeUtils';
import { isEditorAble } from '/@/pages/ApiTest/Body/utils';

export const Header = () => {
  const [formatType, setFormatType] = useAtom(apiTestBodyFormatAtom);
  const [activeAction, setActiveAction] = useState('Pretty');
  const [displayItem, setDisplayItem] = useState<ResDisplayItemsType>('Body');
  const resData = useAtomValue(apiTestResDataAtom);
  const [showAction, setShowAction] = useState(true);

  const formatOptions = FormatOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  useEffect(() => {
    if (resData) {
      const resType = judgementType(resData.type);
      setShowAction(isEditorAble(resType));
    }
  }, [resData]);

  useEffect(() => {
    if (displayItem === 'Body') {
      Emitter.emit('monacoEditor-apiTest', resData?.body);
    } else {
      Emitter.emit('monacoEditor-apiTest', JSON.stringify(resData?.headers));
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
          <Label ribbon as="a" color={'blue'} style={{ marginLeft: 32, height: 24 }}>
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
                    <Label color={'purple'} style={{ marginLeft: 8 }} circular size={'small'}>
                      2
                    </Label>
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
                <Button.Group style={{ background: '#DAE0E7', borderRadius: 3 }}>
                  <Button>{formatType}</Button>
                  <Dropdown
                    onChange={(event: SyntheticEvent, { value }: any) => setFormatType(value)}
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
      </div>
    );
  };
  return (
    <div className={styles.header}>
      {renderLabel()}
      {showAction && renderActions()}
      <div className={styles.statusCon}>
        <StatusCard />
      </div>
    </div>
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
