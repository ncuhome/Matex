import React, { useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { arrow, autoUpdate, useFloating, Placement } from '@floating-ui/react-dom';

interface PopupProps {
  placement?: Placement;
  trigger: React.ReactNode;
  children:React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ trigger, children = '', placement = 'top' }) => {
  const [open, setOpen] = React.useState(false);
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [arrow({ element: arrowRef })]
  });

  return (
    <div className={styles.popup} onMouseLeave={() => setOpen(false)}>
      <button ref={reference} onMouseEnter={() => setOpen(true)} className={styles.trigger}>
        {trigger}
      </button>
      <div
        className={clsx([styles.content,open? styles.show:styles.hidden])}
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0
        }}
      >
        {children}
        <div className={styles.arrow} style={{ bottom: -5, left: arrowX ?? 0 }} ref={arrowRef} />
      </div>
    </div>
  );
};

export default Popup;
