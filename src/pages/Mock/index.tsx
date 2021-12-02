import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import APIHeader from './Header';
import APISider from './Side';
import APIBody from './Body';
import { myEmitter } from '../../utils/EventEmiter';

const MockView = () => {
  const [down, setDown] = useState(false);
  const [inputFocus, setFocus] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    window.requestAnimationFrame(() => {
      if (down && !inputFocus) {
        const distance = e.clientX - startX;
        if (distance > 0) {
          scrollRef.current!.scrollLeft -= Math.abs(distance) / 3;
        } else {
          scrollRef.current!.scrollLeft += Math.abs(distance) / 3;
        }
      }
    });
  };

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setDown(true);
    setStartX(e.clientX);
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setDown(false);
    setStartX(0);
  };

  useEffect(() => {
    myEmitter.on<boolean>('inputFocus', (data) => {
      setFocus(data);
    });
  }, []);

  return (
    <div className={styles.con}>
      <div
        // ref={scrollRef}
        className={styles.header}
        // onMouseDownCapture={onMouseDown}
        // onMouseMove={onMouseMove}
        // onMouseUp={onMouseUp}
        // onMouseDown={onMouseDown}
        // onMouseLeave={() => setDown(false)}
      >
        <APIHeader />
      </div>
      <div className={styles.side}>
        <APISider />
      </div>
      <div className={styles.body}>
        <APIBody />
      </div>
    </div>
  );
};

export default MockView;
