import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import APIHeader from './Header';
import APISider from './Side';

const MockView = () => {
  const [down, setDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (down) {
      const distance = e.clientX - startX;
      if (distance > 0) {
        scrollRef.current!.scrollLeft -= Math.abs(distance) / 4;
      } else {
        scrollRef.current!.scrollLeft += Math.abs(distance) / 4;
      }
    }
  };
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setDown(true);
    setStartX(e.clientX);
  };

  return (
    <div className={styles.con}>
      <div
        ref={scrollRef}
        className={styles.header}
        onMouseDownCapture={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setDown(false)}
        onMouseDown={onMouseDown}
        onMouseLeave={() => setDown(false)}
      >
        <APIHeader />
      </div>
      <div className={styles.side}>
        <APISider />
      </div>
      <div className={styles.body}>222</div>
    </div>
  );
};

export default MockView;
