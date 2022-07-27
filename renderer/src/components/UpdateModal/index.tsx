import * as React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Icon } from 'semantic-ui-react';
import Progress from '/@cmp/UpdateModal/progress';

interface ModalOpt {
  visible: boolean;
  progress: number;
  done: string;
  total: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  wantCancel?: boolean;
}
const Modal: React.FC<ModalOpt> = React.forwardRef(
  (
    { visible = false, wantCancel = false, done, total, onCancel, onConfirm, progress, onClose },
    ref: any
  ) => {
    const handleClose = () => {
      onClose && onClose();
    };

    const renderFooter = (done: string, total: string) => {
      if (wantCancel) {
        return (
          <div className={styles.btns}>
            <button className={styles.cancel} onClick={onCancel}>
              取消
            </button>
            <button className={styles.confirm} onClick={onConfirm}>
              确定
            </button>
          </div>
        );
      } else {
        return (
          <div className={styles.footer}>
            {done} / {total}
          </div>
        );
      }
    };

    return (
      <div ref={ref} className={clsx([styles.modal, visible ? styles.show : styles.hide])}>
        <div className={styles.background} />
        <div className={styles.con}>
          <div className={styles.header}>
            <div className={styles.title} />
            <div className={styles.close} onClick={handleClose}>
              <div>
                <Icon style={{ color: 'black' }} name={'close'} />
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.desc}>{wantCancel ? '取消更新?' : '正在更新'}</div>
            {!wantCancel && <Progress progress={progress} />}
          </div>
          {renderFooter(done, total)}
        </div>
      </div>
    );
  }
);

export default Modal;
