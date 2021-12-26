import React, { SyntheticEvent, useEffect } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react';
import Tabs from './Tabs';
import clsx from 'clsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MethodsOptions } from '../../../Model/collection.model';
import { useUrlConfig } from '../../../zustand/store/collection.store';
import { useSendReq } from '../../../message/collection';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { method, url, setMethod, setUrl } = useUrlConfig((state) => state);
  const { sendToMain } = useSendReq();
  const countryOptions = MethodsOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setMethod(value);
  };

  const handleClick = () => {
    sendToMain();
  };

  useEffect(() => {
    if (location.pathname === '/collect') {
      navigate('/collect/params');
    }
  }, [location.pathname]);

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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Header;
