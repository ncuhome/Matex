import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown } from 'semantic-ui-react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { MethodsOptions } from '/@/model/apiTest.model';
import { useSendReq } from '/@/message/apiTest';
import Tabs from './Tabs';
import { ToastContainer } from 'react-toastify';
import { useAtom } from 'jotai';
import { apiTestMethodAtom, apiTestUrlAtom } from '/@/store/apiTestStore';
import { menuOptions } from '/@/pages/ApiTest/Header/contextMenu';
import { useContextMenu } from '/@/hooks/useContextMenu';
import { MatexWin } from '/@/global';
import { Emitter } from '/@/utils/EventEmiter';
import Emittery from 'emittery';

const countryOptions = MethodsOptions.map((item) => {
  return { key: item, value: item, text: item };
});

const Header = () => {
  const [method, setMethod] = useAtom(apiTestMethodAtom);
  const [url, setUrl] = useAtom(apiTestUrlAtom);
  const listenerRef = useRef<Emittery.UnsubscribeFn>();
  const selectedTextRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelect = (index: number, text: string) => {
    Emitter.emit('apiTest.select', { index, text });
  };

  const { showMenu } = useContextMenu({ options: menuOptions, onSelect });

  const { sendReq } = useSendReq();

  const handleMenuSelect = () => {
    listenerRef.current = Emitter.on('apiTest.select', ({ index }: any) => {
      switch (index) {
        case 0:
          MatexWin.Clipboard.writeText(selectedTextRef.current);
          break;
        case 1:
          {
            MatexWin.Clipboard.writeText(selectedTextRef.current);
            setUrl(url.replace(selectedTextRef.current, ''));
          }
          break;
        case 2:
          setUrl(url + MatexWin.Clipboard.readText());
          break;
        case 3:
          setUrl('');
          break;
      }
    });
  };

  useEffect(() => {
    listenerRef.current?.();
    handleMenuSelect();
    return () => {
      listenerRef.current?.();
    };
  }, [url]);

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const doFetch = () => {
    url.trim() && sendReq();
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    showMenu(e);
  };

  return (
    <>
      <div className={styles.url}>
        <ToastContainer style={{ color: 'red' }} />
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
        <input
          ref={inputRef}
          onSelect={() => {
            selectedTextRef.current = window.getSelection()!.toString().trim();
          }}
          onContextMenu={handleContextMenu}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
        />
        <Button primary size={'large'} onClick={doFetch}>
          发送
        </Button>
      </div>
      <div className={styles.config}>
        <div className={styles.option}>
          <Tabs />
        </div>
        <div className={styles.table}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Header;
