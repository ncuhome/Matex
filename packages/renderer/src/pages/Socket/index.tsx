import React, { useEffect } from 'react';
import Popup from '/@cmp/Popup';
import AccordionMenu from '/@cmp/AccordionMenu';

const SocketTest = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow((s) => !s);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 'auto', width: 500 }}>
      <AccordionMenu title={'宠物店1'}>
        <div>11</div>
        <div>11</div>
      </AccordionMenu>
      <AccordionMenu title={'宠物店2'}>
        <div>11</div>
        <div>11</div>
      </AccordionMenu>
    </div>
  );
};

export default SocketTest;
