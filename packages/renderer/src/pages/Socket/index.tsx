import React, { useEffect } from 'react';
import PlayButton from "/@cmp/PlayButton";
import CircleDotLoading from "/@cmp/Loading/CircleDotLoading";

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 20, width: 500 }}>
      <CircleDotLoading/>
    </div>
  );
};

export default SocketTest;
