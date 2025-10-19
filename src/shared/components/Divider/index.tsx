import React from 'react';

import styles from './Divider.module.scss';
import type { DividerProps } from './types';

const Divider: React.FC<DividerProps> = ({ size = 'medium' }) => {
  const className = `${styles.divider} ${styles[`divider--${size}`]}`;
  return <div className={className} />;
};

export default Divider;
