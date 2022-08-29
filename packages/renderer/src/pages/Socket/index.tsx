import React, { useEffect } from 'react';
import Popup from "/@cmp/Popup";

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 'auto', width: 500 }}>
      <Popup trigger={'点击'} content={'hello world'}/>
    </div>
  );
};

export default SocketTest;
