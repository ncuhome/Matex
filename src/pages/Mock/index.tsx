import React, { Fragment, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import ApiCard from '../../components/ApiCard';
import { useScroll, usePrevious } from 'ahooks';

const MockView = () => {
  const [down, setDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const { left } = useScroll(scrollRef);
  const previous = usePrevious(left);
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (down) {
      const distance = e.clientX - startX;
      console.log(distance, 'distance');
      console.log(scrollRef.current!.scrollLeft, left, '=>scrollLeft');
      console.log(previous, 'previous');
      if (distance > 0) {
        scrollRef.current!.scrollLeft -= Math.abs(distance) / 4;
      } else {
        scrollRef.current!.scrollLeft += Math.abs(distance) / 4;
      }
      if (previous !== left) {
        console.log('比较');
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
        id={'header'}
        className={styles.header}
        onMouseDownCapture={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setDown(false)}
        onMouseDown={onMouseDown}
        onMouseLeave={() => setDown(false)}
      >
        {useMemo(() => {
          return (
            <Fragment>
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
              <ApiCard />
            </Fragment>
          );
        }, [])}
      </div>
    </div>
  );
};

export default MockView;
