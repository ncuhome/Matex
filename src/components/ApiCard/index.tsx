import React, { useState } from 'react';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import CircleProgress from '../CircleProgress';
import BadgeOutlinedIcon from '@material-ui/icons/BadgeOutlined';
import EarbudsOutlined from '@material-ui/icons/EarbudsOutlined';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';

const options = ['修改', '删除', '保存'];
const ITEM_HEIGHT = 48;
export const ApiCard = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  return (
    <div className={styles.apiCard}>
      <div className={styles.header}>
        <div className={styles.point}>
          <div className={styles.inner} />
        </div>
        <div className={styles.time}>2021/10/29</div>
        <div className={styles.option}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch'
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === '保存'} onClick={() => setAnchorEl(null)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.intro}>
          <div className={styles.name}>
            <BadgeOutlinedIcon sx={{ mr: 1 }} />
            <span>成绩</span>
          </div>
          <div className={styles.port}>
            <EarbudsOutlined sx={{ mr: 1 }} />
            <span>8080</span>
          </div>
        </div>
        <div className={styles.count}>
          <CircleProgress theme={'orange'} />
        </div>
      </div>
    </div>
  );
};

export const AddApiCard = () => {
  return (
    <div className={styles.apiCard}>
      <AddIcon sx={{ transform: 'scale(1.2)' }} />
    </div>
  );
};
