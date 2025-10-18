import React, { useEffect, useRef } from 'react';
import type { Movie } from '../../../models/Movie'; 
import MovieCard from '../MovieCard';
import styles from './MovieGrid.module.scss';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  title?: string;
  emptyMessage: string;
  highlightTerm?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({
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
    if (!sentinelRef.current) return;

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

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
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
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            highlightTerm={highlightTerm}
          />
        ))}
      </div>

      {currentPage < totalPages && (
        <div ref={sentinelRef} className={styles.sentinel}>
          {isLoading ? 'Carregando mais filmes...' : ''}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
