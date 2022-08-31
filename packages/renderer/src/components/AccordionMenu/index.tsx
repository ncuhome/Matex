import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import FolderIcon from '/@cmp/svg/FolderIcon';
import OpenFolderIcon from '/@cmp/svg/OpenFolderIcon';
import ProjectIcon from '/@cmp/svg/ProjectIcon';

interface AccordionMenuProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ actions = '', icon = '', title, children }) => {
  const [show, setShow] = React.useState(false);

  const onChange = () => {
    setShow(!show);
  };

  return (
    <div className={styles.row}>
      <div className={styles.tab}>
        <input type="checkbox" id={title} onChange={onChange} checked={show} />
        <label className={clsx([styles.tabLabel])} htmlFor={title}>
          <div className={styles.icon} style={{ width: icon ? 26 : 0 }}>
            {icon}
          </div>
          <div className={styles.title}>{title}</div>
        </label>
        <div className={styles.actions}>{actions}</div>
        <div className={clsx([styles.tabContent, show && styles.show])}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionMenu;
