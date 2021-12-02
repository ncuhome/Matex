import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { AddApiCard, ApiCard } from "../../../components/ApiCard";
import { myEmitter } from "../../../utils/EventEmiter";

const APIHeader = () => {
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
    myEmitter.on<boolean>("inputFocus", (data) => {
      setFocus(data);
    });
  }, []);

  return (
    <div className={styles.apiArea}>
      <div
        ref={scrollRef}
        onMouseDownCapture={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={() => setDown(false)}
        className={styles.content}
      >
        <ApiCard />
        <ApiCard />
        <ApiCard />
        <ApiCard />
        <ApiCard />
        <ApiCard />
        <AddApiCard />
      </div>
    </div>
  );
};

export default APIHeader;
