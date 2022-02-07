import React from 'react';
import styles from './index.module.scss';
interface PreviewProps {
  src: string;
}
const PreviewRes: React.FC<PreviewProps> = ({ src }) => {
  return <iframe frameBorder={0} src={src} className={styles.previewRes} />;
};

export default PreviewRes;
