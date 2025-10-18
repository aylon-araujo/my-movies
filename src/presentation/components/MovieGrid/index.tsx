import React from 'react';
import type { Movie } from '../../../models/Movie'; 
import MovieCard from '../MovieCard';
import styles from './MovieGrid.module.scss';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            highlightTerm={highlightTerm}
          />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          Anterior
        </button>
        <span className={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;
