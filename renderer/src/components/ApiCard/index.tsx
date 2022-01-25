import React from 'react';
import styles from './index.module.scss';
// import { Badge, Button, User } from '@geist-ui/react';
// import Plus from '@geist-ui/react-icons/plus';

export const ApiCard = () => {
  return (
    <div className={styles.apiCard}>
      {/*<User src="https://unix.bio/assets/avatar.png" name="Matex">*/}
      {/*  2021年12月17号*/}
      {/*</User>*/}
    </div>
    // <Badge.Anchor>
    //     //
    //     //   <Badge scale={0.5} mt={Mock.5} mr={Mock.3}>
    //     //     10
    //     //   </Badge>
    //     // </Badge.Anchor>
  );
};

export const AddApiCard = () => {
  return <div>111</div>;
  // return <Button iconRight={<Plus />} auto scale={Mock} mt={Mock} shadow mx={Mock} mr={2} px={0.6} />;
};
