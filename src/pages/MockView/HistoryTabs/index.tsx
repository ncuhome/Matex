import React from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/styles';

const AntTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: 'none',
  minWidth: 0,
  marginRight: 0,
  // color: 'rgba(0, 0, 0, 0.85)',
  borderRadius: 6,
  border: '1px transparent solid',
  '&:hover': {
    color: '#898AFF',
    opacity: 1,
    background: 'rgba(229,229,229,0.3)'
  },
  '&.Mui-selected': {
    color: '#F84806',
    fontWeight: 400,
    border: '1px #5658FF solid',
    background: '#BCBDFF'
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
        <span style={{ marginRight: 5, fontSize: '13px' }}>Get</span>
        <span style={{ color: '#434200', fontSize: '12px', textTransform: 'lowercase' }}>
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
            height: 0,
            margin: 'auto',
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
