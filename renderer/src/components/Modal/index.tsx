import * as React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Icon } from 'semantic-ui-react';

interface ModalOpt {
  visible: boolean;
  title: string;
  progress?: number;
  content?: React.ReactNode;
  closeToast?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Modal: React.FC<ModalOpt> = React.forwardRef(
  ({ visible = false, progress, title = '', closeToast, onCancel, onConfirm, content }, ref: any) => {
    const onClickCancel = () => {
      onCancel?.();
      closeToast?.();
    };

    const onClickConfirm = () => {
      onConfirm?.();
    };

    return (
      <div ref={ref} className={clsx([styles.modal, visible ? styles.show : styles.hide])}>
        <div className={styles.background} />
        <div className={styles.con}>
          <div className={styles.header}>
            <div className={styles.title} />
            <div className={styles.close} onClick={() => closeToast && closeToast()}>
              <div style={{ marginTop: -1, marginLeft: 1 }} className={styles.iconCon}>
                <Icon className={styles.icon} name={'close'} />
              </div>
            </div>
          </div>
          <div className={styles.body}>{content}</div>
          <div className={styles.footer}>
            <button className={styles.cancel} onClick={onClickCancel}>
              取消
            </button>
            <button className={styles.confirm} onClick={onClickConfirm}>
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
