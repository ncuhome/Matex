import React, { useEffect } from 'react';
import { XyzTransition } from '@animxyz/react';

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 'auto', width: 500 }}>
      <XyzTransition xyz="fade-50% small-5 ease-out-back">
        {show && <div style={{ width: 100, height: 100, background: 'var(--light-text1)' }} />}
      </XyzTransition>
    </div>
  );
};

export default SocketTest;
