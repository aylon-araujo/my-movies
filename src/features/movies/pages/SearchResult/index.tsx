import React from "react";

import { FloatingButton, If, MovieGrid } from "@shared/components";
import { pluralize } from "@shared/utils/pluralize";

import { useMovieList } from "../../hooks/useMovieList";
import styles from "./SearchPage.module.scss";

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
      <div className={styles.searchPageHead}>
        <h1 className={styles.searchTitle}>
          Resultados para:{" "}
          <span className={styles.queryHighlight}>
            "{decodeURIComponent(currentQuery)}"
          </span>
        </h1>
        <If condition={!!movies.length}>
          <span>
            {pluralize(movies.length > 1, "Encontrado")} {movies.length}{" "}
            {pluralize(movies.length > 1, "filme")}
          </span>
        </If>
      </div>

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
