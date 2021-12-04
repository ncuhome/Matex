import React from 'react';
import styles from './index.module.scss';
import { AddApiList, ApiList } from '../../../components/ApiList';
import BallLoading from '../../../components/BallLoading';

const APISider = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className={styles.sider}>
      <div className={styles.form}>
        <div className={styles.title}>接口列表</div>
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <AddApiList />
      </div>
      <div className={styles.card}>
        {open ? (
          <div onClick={handleClose} style={{ cursor: 'pointer' }}>
            <BallLoading />
          </div>
        ) : (
          <div className={styles.buttonOuter} onClick={handleClick}>
            启动
          </div>
        )}
      </div>
    </div>
  );
};

export default APISider;
