import React from 'react';
import styles from './index.module.scss';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { ChildType } from '../index';

const Started = ({ onClick }: ChildType) => {
  return (
    <div className={styles.con}>
      <div className={styles.start} onClick={onClick}>
        <div>
          <TagFacesIcon sx={{ fontSize: 80, color: '#136F2E' }} />
        </div>
        <div className={styles.text}>已在运行,点击停止</div>
      </div>
    </div>
  );
};

export default Started;
