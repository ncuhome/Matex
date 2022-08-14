import React, { useEffect } from 'react';

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 'auto', width: 500 }}>
      SocketTest
    </div>
  );
};

export default SocketTest;
