import React from 'react';
import styles from './index.module.scss';
import { AddApiList, ApiList } from '../../../components/ApiList';
import Idle from './Idle';
import Success from './Success';
import Loading from './Loading';

enum Status {
  Idle,
  Loading,
  Success
}

export interface ChildType {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const APISider = () => {
  const [status, setStatus] = React.useState<Status>(Status.Idle);

  const handleClick = () => {
    switch (status) {
      case Status.Idle:
        setStatus(Status.Loading);
        setTimeout(() => {
          setStatus(Status.Success);
        }, 5000);
        break;
      case Status.Loading:
        setStatus(Status.Idle);
        break;
      case Status.Success:
        setStatus(Status.Idle);
        break;
    }
  };

  const render = () => {
    let res: React.ReactNode;
    switch (status) {
      case Status.Idle:
        res = <Idle onClick={handleClick} />;
        break;
      case Status.Success:
        res = <Success onClick={handleClick} />;
        break;
      case Status.Loading:
        res = <Loading onClick={handleClick} />;
        break;
    }
    return res;
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
      {render()}
    </div>
  );
};

export default APISider;
