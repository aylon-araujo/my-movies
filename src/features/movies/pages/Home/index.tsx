import React from 'react';
import MovieGrid from '@shared/components/MovieGrid';
import { useMovieList } from '../../hooks/useMovieList';
import styles from './Home.module.scss'

const HomePage: React.FC = () => {
  const { 
    movies, 
    isLoading, 
    error, 
    currentPage, 
    totalPages, 
    goToPage,
  } = useMovieList();

  return (
    <div className={styles.homePageContainer}>
      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        emptyMessage="Nenhum filme popular encontrado. Verifique sua conexão ou a API."
      />
    </div>
  );
};

export default HomePage;