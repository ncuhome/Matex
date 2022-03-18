import * as React from 'react';
import usePortal from 'react-useportal';
import Modal from './index';
import { MatexWin } from '/@/global';

const useModal = () => {
  const { isOpen, openPortal, closePortal, Portal, ref } = usePortal({
    isOpen: false,
    onClose: () => {
      console.log('onClose');
    }
  });
  const [wantCancel, setWantCancel] = React.useState(false);

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

  const ToastView = ({ progress }: { progress: number }) => {
    return (
      <Portal>
        <Modal
          // @ts-ignore
          ref={ref}
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
    ref,
    isOpen
  };
};

export default useModal;
