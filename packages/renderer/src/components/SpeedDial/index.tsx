import React, { useEffect } from 'react';
import styles from './index.module.scss';
import FunctionIcon from '/@cmp/svg/FunctionIcon';
import clsx from 'clsx';

interface SpeedDialProps {
  icons: React.ReactNode[];
  onSelect?: (index: number) => void;
}

const SpeedDial: React.FC<SpeedDialProps> = ({ icons = [], onSelect = () => {} }) => {
  const [open, setOpen] = React.useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    console.log('onClick');
    setOpen(!open);
    console.log(open);
  };

  useEffect(() => {
    const _handle = () => setOpen(false);
    document.addEventListener('click', _handle);

    return () => {
      document.removeEventListener('click', _handle);
    };
  }, []);

  return (
    <div className={styles.speedDial}>
      <div className={styles.btn} onClick={onClick}>
        <FunctionIcon fill={'var(--light-text1)'} />
      </div>
      <div className={clsx([styles.menu, open ? styles.show : styles.hidden])}>
        {icons.map((item, index) => {
          return (
            <div className={styles.menuItem} onClick={() => onSelect(index)} key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpeedDial;
