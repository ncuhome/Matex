import React from 'react';
import styles from './index.module.scss';
import { animated, config, useSpring } from 'react-spring';
import { Delay } from '/@/utils/time';
import planeIcon from '/@/assets/icon/plane.svg';
import successIcon from '/@/assets/icon/success.svg';
import errorIcon from '/@/assets/icon/error.svg';
import { useSendReq } from '/@/message/apiTest';

const Status = {
  Idle: 1,
  Success: 2,
  Failed: 3
};

const SendBtn = () => {
  const { sendReq } = useSendReq();
  const [ani, setAni] = React.useState(false);
  const [status, setStatus] = React.useState(Status.Idle);
  const sendRef = React.useRef(false);

  const aniStyles = useSpring({
    top: ani ? 10 : 20,
    left: ani ? 30 : 15,
    width: ani ? 30 : 40,
    delay: 100,
    reset: true,
    config: config.stiff
  });

  const icon = status === Status.Success ? successIcon : status === Status.Failed ? errorIcon : planeIcon;

  const handleSend = async () => {
    console.log(sendRef.current);
    if (sendRef.current) {
      sendRef.current = false;
      return;
    }
    sendRef.current = true;
    setAni(true);
    const res = sendReq();
    await Delay.time(800);
    setAni(false);
    if (res) {
      setStatus(Status.Success);
    } else {
      setStatus(Status.Failed);
    }
    await Delay.time(2000);
    setStatus(Status.Idle);
    sendRef.current = false;
  };

  return (
    <div className={styles.footer} onClick={handleSend}>
      <div className={styles.startBtn}>发送请求</div>
      <div className={styles.iconCon}>
        <animated.img style={aniStyles} className={styles.plane} src={icon} />
      </div>
    </div>
  );
};

export default SendBtn;
