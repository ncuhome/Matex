import React, { Fragment } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/styles';

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  marginRight: 0,
  color: 'rgba(0, 0, 0, 0.85)',
  '&:hover': {
    color: '#D2E6FD',
    opacity: 1,
    background: '#d1eaff',
    borderRadius: 4
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: 400,
    background: '#d1eaff'
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff'
  }
}));

const HistoryApiTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const LabelText = () => {
    return (
      <Box>
        <span style={{ marginRight: 5, color: '#FF7F00', fontSize: '13px' }}>Get</span>
        <span style={{ color: '#C4C4C4', fontSize: '12px', textTransform: 'lowercase' }}>
          {'https://baidu.com'}
        </span>
      </Box>
    );
  };

  return (
    <div className={styles.tabCon}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        indicatorColor={'secondary'}
        TabIndicatorProps={{
          style: {
            height: 3,
            borderRadius: 3
          }
        }}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <AntTab label={<LabelText />} />;
        <AntTab label={<LabelText />} />;
        <AntTab label={<LabelText />} />;
      </Tabs>
      <div className={styles.addItem}>
        <AddIcon />
      </div>
    </div>
  );
};

export default HistoryApiTab;
