

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { movieApi } from '../../../services/http/MovieApi';
import MovieGrid from "../../components/MovieGrid";
import MovieCard from "../../components/MovieCard";
import Button from "../../components/Button";
import type { Movie, MovieSearchResponse } from "../../../models/Movie";

import styles from "./SearchPage.module.scss";

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  const fetchResults = useCallback(async (term: string, pageNum: number) => {
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response: MovieSearchResponse = await movieApi.searchMoviesByTitle(
        term,
        pageNum
      );

      const { results: newResults, total_pages } = response;

      setTotalPages(total_pages);

      if (pageNum === 1) {
        setResults(newResults);
      } else {
        setResults((prev) => [...prev, ...newResults]);
      }
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      setPage(1);
      fetchResults(decodeURIComponent(query), 1);
    } else {
      setResults([]);
      setPage(1);
      setTotalPages(1);
    }
  }, [query, fetchResults]);

  const loadMore = () => {
    if (!loading && page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResults(decodeURIComponent(query!), nextPage);
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (!query) {
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
          {decodeURIComponent(query)}
        </span>
        "
      </h1>
      {loading && page === 1 && <p>Carregando...</p>}
      {results.length > 0 && (
        <MovieGrid>
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              highlightTerm={decodeURIComponent(query)}
              onClick={handleMovieClick}
            />
          ))}
        </MovieGrid>
      )}
      {page < totalPages && (
        <div className={styles.loadMoreContainer}>
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="primary"
            size="large"
          >
            {loading ? "Carregando Mais..." : "Carregar Mais"}
          </Button>
        </div>
      )}
      {results.length === 0 && !loading && (
        <p>Nenhum filme encontrado para "{decodeURIComponent(query)}".</p>
      )}
    </div>
  );
};

export default SearchPage;
