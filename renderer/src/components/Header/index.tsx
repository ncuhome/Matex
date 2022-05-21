import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import TrafficLights from '/@cmp/TrafficLights';
import { MatexWin } from '/@/global';
import terminalIcon from '/@/assets/icon/terminal.svg';
import wenhaoIcon from '/@/assets/icon/bangzhu.svg';
import shezhiIcon from '/@/assets/icon/shezhi.svg';
import 'xterm/css/xterm.css';
import clsx from 'clsx';
import { userTerminal } from '/@/hooks/userTerminal';
import { useClickAway } from 'ahooks';
import UnderLineRoute from '/@cmp/UnderlineRoute';

const Header = () => {
  const [showTerminal, setShowTerminal] = React.useState(false);
  const { terminal, termPrint } = userTerminal();
  const termDomRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef(true);

  useEffect(() => {
    termPrint('Hello');
  }, []);

  useClickAway(() => {
    if (!firstRef.current) {
      setShowTerminal(false);
      terminal?.dispose();
      firstRef.current = true;
    } else {
      firstRef.current = false;
    }
  }, termDomRef);

  const createTerminal = (e) => {
    setShowTerminal(true);
    if (terminal) {
      setTimeout(() => {
        terminal.open(document.getElementById('terminal') as HTMLElement);
        new Array(10).fill(0).forEach((_, i) => {
          if (i % 2 === 0) {
            termPrint({ i: i });
          } else {
            termPrint(i);
          }
        });
        termPrint({
          rows: 17,
          cols: 53,
          cursorStyle: 'bar',
          theme: {
            background: '#34598D'
          },
          fontFamily: '"Fira Code", "Fira Mono", "Fira Mono for Powerline", monospace'
        });
      }, 500);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>{MatexWin.OS === 'win' && <TrafficLights />}</div>
      <div className={styles.md}>
        <UnderLineRoute />
      </div>
      <div className={styles.right}>
        <img
          src={terminalIcon}
          onClick={createTerminal}
          className={styles.terminalIcon}
          alt={'terminalIcon'}
        />
        <img src={shezhiIcon} className={styles.terminalIcon} alt={'terminalIcon'} />
        <img src={wenhaoIcon} className={styles.terminalIcon} alt={'terminalIcon'} />
      </div>
      <div
        ref={termDomRef}
        style={{ display: showTerminal ? 'block' : 'none' }}
        className={clsx([styles.scaleUpTr, styles.terminalCon])}
        id={'terminal'}
      />
    </div>
  );
};

export default Header;
