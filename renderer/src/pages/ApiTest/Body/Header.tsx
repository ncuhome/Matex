import { Button, Dropdown, Icon, Label, Menu, Popup } from 'semantic-ui-react';
import styles from './index.module.scss';
import { Actions, FormatOptions, ResDisplayItems } from '/@/model/apiTest.model';
import React, { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Emitter } from '/@/utils/EventEmiter';
import { FormatType, ResDisplayItemsType } from '/@/type/apiTest';
import { apiTestBodyActionAtom, apiTestBodyFormatAtom, apiTestResDataAtom } from '/@/store/apiTestStore';
import { useAtomValue } from 'jotai/utils';
import { StatusCard } from '/@/pages/ApiTest/Body/StatusCard';
import { useAtom } from 'jotai';
import { judgementType } from '/@/utils/typeUtils';
import { isEditorAble } from '/@/pages/ApiTest/Body/utils';
import { MatexWin } from '/@/global';

const formatOptions = FormatOptions.map((item) => {
  return { key: item, value: item, text: item };
});
export const Header = () => {
  const [formatType, setFormatType] = useAtom(apiTestBodyFormatAtom);
  const [activeAction, setActiveAction] = useAtom(apiTestBodyActionAtom);
  const [displayItem, setDisplayItem] = useState<ResDisplayItemsType>('Body');
  const resData = useAtomValue(apiTestResDataAtom);
  const [showAction, setShowAction] = useState(true);

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

  const handleCopy = () => {
    MatexWin.Clipboard.writeText(resData!.body);
  };

  const handleFind = () => {
    Emitter.emit('monacoEditor.apiTest.find', true);
  };

  const renderLabel = () => {
    return (
      <Popup
        on="click"
        position={'bottom center'}
        pinned
        trigger={
          <Label size={'small'} ribbon as="a" color={'blue'} style={{ marginLeft: 32, height: 24 }}>
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
                  <Button
                    style={{ boxShadow: '2px 2px 2px #8684A8' }}
                    className={clsx([active && styles.active])}
                    onClick={() => setDisplayItem(item)}
                  >
                    {item}
                    {'(2)'}
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
          <Menu secondary size={'small'}>
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
                <Button.Group size={'small'} style={{ borderRadius: 3 }}>
                  <Button>{formatType}</Button>
                  <Dropdown className="button icon" floating trigger={<></>}>
                    <Dropdown.Menu>
                      {formatOptions.map((item) => {
                        return (
                          <Dropdown.Item
                            onClick={() => setFormatType(item.text as FormatType)}
                            key={item.value}
                            value={item.value}
                            active={item.text === formatType}
                          >
                            {item.text}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Button.Group>
              </Menu.Item>
            </Menu.Menu>
            {resData && (
              <Menu.Menu style={{ marginLeft: -18 }}>
                <Menu.Item>
                  <Button.Group size={'small'}>
                    <Button icon onClick={handleCopy}>
                      <Icon name="copy outline" />
                    </Button>
                    <Button icon onClick={handleFind}>
                      <Icon name="search" />
                    </Button>
                  </Button.Group>
                </Menu.Item>
              </Menu.Menu>
            )}
          </Menu>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.header}>
      {renderLabel()}
      {showAction && renderActions()}
      <StatusCard />
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
