import React, { useEffect } from 'react';
import Checkbox from "/@cmp/Checkbox";

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 20, width: 500 }}>
      <Checkbox/>
    </div>
  );
};

export default SocketTest;
