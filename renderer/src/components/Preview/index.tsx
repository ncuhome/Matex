import React from 'react';
import styles from './index.module.scss';
interface PreviewProps {
  src: string;
}
const Preview: React.FC<PreviewProps> = ({ src }) => {
  return <iframe src={src} className={styles.preview} />;
};

export default Preview;
