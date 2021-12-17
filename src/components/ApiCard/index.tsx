import React from 'react';
import styles from './index.module.scss';
import { Badge, Button, User } from '@geist-ui/react';
import Plus from '@geist-ui/react-icons/plus';

export const ApiCard = () => {
  return (
    <Badge.Anchor>
      <div className={styles.apiCard}>
        <User src="https://unix.bio/assets/avatar.png" name="Matex">
          2021年12月17号
        </User>
      </div>
      <Badge scale={0.5} mt={1.5} mr={1.3}>
        10
      </Badge>
    </Badge.Anchor>
  );
};

export const AddApiCard = () => {
  return <Button iconRight={<Plus />} auto scale={1} mt={1} shadow mx={1} mr={2} px={0.6} />;
};
