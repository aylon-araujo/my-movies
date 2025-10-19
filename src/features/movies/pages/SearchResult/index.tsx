import React from 'react';

import FloatingButton from "@shared/components/FloatingButton";
import MovieGrid from '@shared/components/MovieGrid';

import { useMovieList } from '../../hooks/useMovieList';
import styles from './SearchPage.module.scss'

const SearchResult: React.FC = () => {
  const { 
    movies, 
    isLoading, 
    error, 
    currentPage, 
    totalPages, 
    goToPage,
    currentQuery,
    isSearch,
  } = useMovieList();

  if (!isSearch) {
    return (
      <div className={styles.searchPageContent}>
        <p>Use a barra de pesquisa para encontrar filmes.</p>
      </div>
    );
  }
  return (
    <div className={styles.searchPageContainer}>
      <h1 className={styles.searchTitle}>
        Resultados para: "
        <span className={styles.queryHighlight}>
          {decodeURIComponent(currentQuery)}
        </span>
        "
      </h1>
      
      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        emptyMessage={`Nenhum resultado encontrado para: "${currentQuery}".`}
        highlightTerm={currentQuery}
      />

      <FloatingButton />
    </div>
  );
};

export default SearchResult;
