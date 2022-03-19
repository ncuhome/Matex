import * as React from 'react';
import usePortal from 'react-useportal';
import Modal from './index';
import { MatexWin } from '/@/global';

interface ViewProps {
  done: string;
  total: string;
  progress: number;
}

const useUpdateModal = () => {
  const [wantCancel, setWantCancel] = React.useState(false);

  const { isOpen, openPortal, closePortal, Portal, ref } = usePortal({
    isOpen: false,
    onClose: () => {
      setWantCancel(false);
    }
  });

  const openToast = () => {
    if (isOpen) return;
    openPortal();
  };

  const onClose = () => {
    setWantCancel(true);
  };

  const onCancel = () => {
    setWantCancel(false);
  };

  const onConfirm = () => {
    setWantCancel(false);
    MatexWin.ipc?.send('cancel-update', true);
    closePortal();
  };

  const ToastView = ({ progress, done, total }: ViewProps) => {
    return (
      <Portal>
        <Modal
          // @ts-ignore
          ref={ref}
          done={done}
          total={total}
          wantCancel={wantCancel}
          progress={progress}
          visible={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </Portal>
    );
  };

  return {
    ToastView,
    openToast,
    closePortal,
    ref,
    isOpen
  };
};

export default useUpdateModal;
