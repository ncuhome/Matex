import { terminalAtom } from '/@/store/commonStore';
import { useAtom } from 'jotai';
import { Terminal } from 'xterm';
import { useEffect, useRef } from 'react';
import inspect from 'object-inspect';

export const userTerminal = () => {
  const [terminal, setTerminal] = useAtom(terminalAtom);
  const cacheRef = useRef<any[]>([]);

  useEffect(() => {
    if (terminal && cacheRef.current.length !== 0) {
      cacheRef.current.forEach((item) => {
        const str = inspect(item);
        terminal.writeln('\x1b[32;01mMatex $\x1b[32;01m ' + str);
      });
      cacheRef.current = [];
    }
  }, [terminal]);

  const create = () => {
    const term = new Terminal({
      rows: 17,
      cols: 53,
      cursorStyle: 'bar',
      theme: {
        background: '#34598D'
      },
      fontFamily: '"Fira Code", "Fira Mono", "Fira Mono for Powerline", monospace'
    });
    setTerminal(term);
  };

  const print = (content: any) => {
    if (!terminal) {
      create();
      cacheRef.current.push(content);
      return;
    } else {
      const str = inspect(content);
      terminal.writeln('\x1b[32;01mMatex $\x1b[32;01m ' + str);
    }
  };

  return {
    terminal,
    termPrint: print
  };
};
