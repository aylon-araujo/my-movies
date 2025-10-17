import React from 'react';
import styles from './MovieGrid.module.scss';

interface MovieGridProps {
  children: React.ReactNode;
}

const MovieGrid: React.FC<MovieGridProps> = ({ children }) => {
  return (
    <div className={styles.movieGrid}>
      {children}
    </div>
  );
};

export default MovieGrid;