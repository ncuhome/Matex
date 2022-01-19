import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

export interface NavTabProps {
  name: string;
  value: string;
}

export interface NavTabsOptions {
  activeTab: string;
  tabs: Array<NavTabProps>;
  onChange?: (tab: NavTabProps) => void;
}

const NavTabs: React.FC<NavTabsOptions> = ({ activeTab, tabs = [], onChange = () => {} }) => {
  const [currentTab, setCurrentTab] = React.useState(activeTab);

  const validate = (tab: NavTabProps, val: string) => {
    return tab.value === val || tab.name === val;
  };

  const handleClick = (tab: NavTabProps) => {
    setCurrentTab(tab.name);
    onChange(tab);
  };

  return (
    <div className={styles.tabCon}>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={clsx(styles.tab, validate(tab, currentTab) && styles.activeTab)}
          onClick={() => handleClick(tab)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default NavTabs;
