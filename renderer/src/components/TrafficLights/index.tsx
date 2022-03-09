import React from 'react';
import styles from './index.module.scss';
import {Icon} from 'semantic-ui-react';
import clsx from 'clsx';
import {MatexWin} from '/@/global';
import {Global_Channel} from '/@common/ipc/channel';
import {fullscreenAtom} from '/@/store/commonStore';
import {useAtom} from 'jotai';

const TrafficLights = () => {
  const [isFullscreen,setFullscreen] = useAtom(fullscreenAtom);

  const onClickLights = (type:'close'|'minimize'|'fullscreen') => {
    setFullscreen(!isFullscreen);
    MatexWin.ipc?.send(Global_Channel.TrafficLights, type);
  };

  return (
    <div className={styles.con}>
      <div className={styles.close} onClick={()=>onClickLights('close')}>
        <div style={{marginTop:'-2px'}} className={styles.iconCon}>
          <Icon className={styles.icon}  name={'close'}/>
        </div>
      </div>
      <div className={styles.minimize} onClick={()=>onClickLights('minimize')}>
        <div style={{marginTop:'-8px'}} className={styles.iconCon}>
          <Icon className={styles.icon}  name={'window minimize'}/>
        </div>
      </div>
      <div className={styles.fullscreen} onClick={()=>onClickLights('fullscreen')}>
        <div style={{marginTop:'6px',marginLeft:8}} className={styles.iconCon}>
          <Icon className={clsx([styles.icon,styles.rotate])}  name={'sort'}/>
        </div>
      </div>
    </div>
  );
};

export default TrafficLights;
