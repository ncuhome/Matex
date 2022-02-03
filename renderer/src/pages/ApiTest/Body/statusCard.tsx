import React from 'react';
import styles from './index.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom } from '/@/store/apiTestStore';

export const StatusCard = () => {
  const resData = useAtomValue(apiTestResDataAtom);

  const renderTiming = () => {
    return (
      <div>
        <div>111111111111</div>
        <div>1111</div>
        <div>1111</div>
      </div>
    );
  };

  if (resData) {
    const color = getColor(resData.statusCode);
    return (
      <div className={styles.statusCard} style={{ color }}>
        <div className={styles.statusCode}>{resData.statusCode}</div>
        <div className={styles.statusDesc}>{resData.desc}</div>
        <div className={styles.statusTiming}>
          <Popup position={'bottom center'} trigger={<Icon name="clock" />}>
            {renderTiming()}
          </Popup>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const getColor = (statusCode: number) => {
  if (statusCode < 200) {
    return '#C6C7C9';
  } else if (statusCode >= 200 && statusCode < 300) {
    return '#2CB5AD';
  } else if (statusCode >= 300 && statusCode < 400) {
    return '#6DF9F9';
  } else if (statusCode >= 400 && statusCode < 500) {
    return '#FB9069';
  } else {
    return '#F73C3C';
  }
};
