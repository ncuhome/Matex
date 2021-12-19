import React from 'react';
import styles from './index.module.scss';
import { AddApiList, ApiList } from '../../../components/ApiList';
import Idle from './Idle';
import Success from './Success';
import Loading from './Loading';
import { usePortChannel } from '../../../hooks/usePortChannel';
// import { Button, Input } from '@geist-ui/react';
// import { ChevronLeftCircle, Delete, Save } from '@geist-ui/react-icons';

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
  const { postMessage, port } = usePortChannel();

  const handleClick = () => {
    switch (status) {
      case Status.Idle:
        postMessage<string>('server', 'start');
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
      <div className={styles.data}>
        <div className={styles.header}>
          {/*<Input label="端口" placeholder="请输入端口" />*/}
          <div className={styles.title}>接口列表</div>
        </div>
        <div className={styles.list}>
          <ApiList type={'get'} />
          <ApiList type={'get'} />
          <ApiList type={'get'} />
          <ApiList type={'get'} />
          <AddApiList />
        </div>
      </div>
      <div className={styles.btnGroup}>
        {/*<Button*/}
        {/*  style={{ backgroundColor: 'black' }}*/}
        {/*  icon={<ChevronLeftCircle color={'white'} />}*/}
        {/*  shadow*/}
        {/*  auto*/}
        {/*  px={0.6}*/}
        {/*/>*/}
        {/*<Button icon={<Save />} shadow auto px={0.6} />*/}
        {/*<Button icon={<Delete />} shadow auto px={0.6} />*/}
      </div>
      <div className={styles.status}>{render()}</div>
    </div>
  );
};

export default APISider;
