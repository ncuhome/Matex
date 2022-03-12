import React from 'react';
import styles from './index.module.scss';
import { ApiList } from '/@cmp/ApiList';
import { Button, Icon, Label } from 'semantic-ui-react';
import useModal from '/@cmp/Modal/useModal';
import Progress from '/@cmp/Modal/progress';

const style = {
  background: '#466085',
  color: '#8ADDFF',
  marginLeft: 10
};

const CollectSide = () => {
  const onConfirm = () => {
    let i = 0;
    setInterval(() => {
      i++;
      updateContent(<Progress progress={i} />);
    }, 1000);
  };

  const { ToastView, openToast, updateContent } = useModal({ onConfirm });

  const handleClick = () => {
    openToast({ content: <p>有更新可用, 是否更新 ?</p> });
  };

  return (
    <div className={styles.side}>
      <div className={styles.list}>
        <div className={styles.header}>
          <Label style={style} size={'small'} onClick={handleClick}>
            请求历史<span style={{ color: '#8ADDFF', display: 'inline-block', marginLeft: 10 }}>79</span>
          </Label>
        </div>
        <div className={styles.recordList}>
          <ApiList type={'get'} url={'http://localhost:3000/test'} />
          <ApiList type={'get'} url={'http://localhost:3000/test'} />
          <ApiList type={'post'} url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList type={'post'} url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
        </div>
      </div>
      <div className={styles.ops}>
        <Button icon className={styles.btn}>
          <Icon className={styles.icon} name="save" />
          &nbsp;保存
        </Button>
        <Button icon className={styles.btn}>
          <Icon className={styles.icon} name="trash alternate" />
          &nbsp; 删除
        </Button>
      </div>
      <ToastView />
    </div>
  );
};

export default CollectSide;
