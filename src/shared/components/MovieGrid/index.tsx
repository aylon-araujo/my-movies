import React, { useEffect, useRef } from 'react';

import { If } from '../If';
import { MovieCard } from '../MovieCard';
import styles from './MovieGrid.module.scss';
import type { MovieGridProps } from './types';

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  title,
  emptyMessage,
  highlightTerm,
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && currentPage < totalPages) {
          if (onPageChange) onPageChange(currentPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isLoading, currentPage, totalPages, onPageChange]);

  if (isLoading && movies.length === 0) {
    return <div>Carregando Filmes...</div>; 
  }

  if (error) {
    return (
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.movieGridContainer}>
      <If condition={!!title}>
        <h2 className={styles.title}>{title}</h2>
      </If>

      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            highlightTerm={highlightTerm}
          />
        ))}
      </div>

      <If condition={currentPage < totalPages}>
        <div ref={sentinelRef} className={styles.sentinel}>
          {isLoading ? 'Carregando mais filmes...' : ''}
        </div>
      </If>
    </div>
  );
};
