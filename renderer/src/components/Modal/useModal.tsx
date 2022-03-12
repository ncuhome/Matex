import * as React from 'react';
import usePortal from 'react-useportal';
import Modal from './index';

export interface UseModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface OpenToastProps {
  content: React.ReactNode;
}

const useModal = ({ onConfirm, onCancel }: UseModalProps) => {
  const [_content, setContent] = React.useState<React.ReactNode>();
  const { isOpen, openPortal, closePortal, Portal, ref } = usePortal({
    isOpen: false,
    onClose: () => {
      console.log('onClose');
    }
  });

  const openToast = ({ content }: OpenToastProps) => {
    if (isOpen) return;
    setContent(content);
    openPortal();
  };

  const updateContent = (content: React.ReactNode) => {
    setContent(content);
  };

  const ToastView = () => {
    return (
      <Portal>
        <Modal
          // @ts-ignore
          ref={ref}
          onCancel={onCancel}
          onConfirm={onConfirm}
          content={_content}
          visible={isOpen}
          closeToast={closePortal}
          title={'title'}
        />
      </Portal>
    );
  };

  return {
    ToastView,
    updateContent,
    openToast,
    ref,
    isOpen
  };
};

export default useModal;
