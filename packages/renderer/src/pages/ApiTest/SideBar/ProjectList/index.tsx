import React from 'react';
import styles from './index.module.scss';
import AccordionMenu from '/@cmp/AccordionMenu';
import ProjectIcon from '/@cmp/svg/ProjectIcon';
import AddIcon from '/@cmp/svg/AddIcon';
import ThreeDotIcon from '/@cmp/svg/ThreeDotIcon';
import clsx from 'clsx';

const ProjectList = () => {
  const Actions = () => {
    return (
      <>
        <AddIcon className={clsx(['svgIcon', 'hover'])} fill={'var(--light-text1)'} />
        <ThreeDotIcon className={clsx(['svgIcon', 'hover'])} fill={'var(--light-text1)'} />
      </>
    );
  };

  return (
    <div className={styles.projectList}>
      <AccordionMenu title={'项目'} icon={<ProjectIcon fill={'var(--light-text1)'} />} actions={Actions()}>
        <AccordionMenu title={'宠物店2'}>
          <div>11</div>
          <div>11</div>
        </AccordionMenu>
      </AccordionMenu>
    </div>
  );
};

export default ProjectList;
