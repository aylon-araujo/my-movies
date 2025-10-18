import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieApi } from '../services/http/MovieApi';
import type { Movie } from '../models/Movie';

interface UseMovieListReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  currentQuery: string;
  isSearch: boolean;
  goToPage: (pageNumber: number) => void;
}

export const useMovieList = (): UseMovieListReturn => {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const isSearch = currentQuery.trim().length > 0;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(
    async (query: string, pageToLoad: number) => {
      setIsLoading(true);
      setError(null);

      if (pageToLoad === 1) {
        setMovies([]);
      }

      try {
        const data = await movieApi.fetchMoviesList(query, pageToLoad);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setCurrentPage(pageToLoad);

        setMovies((prevMovies) => {
          if (pageToLoad === 1) {
            return data.results;
          } else {
            const newMovies = data.results.filter(
              (newMovie) => !prevMovies.some((m) => m.id === newMovie.id)
            );
            return [...prevMovies, ...newMovies];
          }
        });
      } catch (err) {
        console.error('Erro ao buscar lista de filmes:', err);
        setError(`Erro ao carregar filmes. ${isSearch ? `Busca: "${query}"` : 'Populares'}.`);
      } finally {
        setIsLoading(false);
      }
    },
    [isSearch]
  );

  useEffect(() => {
    fetchList(currentQuery, 1);
    setCurrentPage(1);
  }, [currentQuery, fetchList]);

  const goToPage = useCallback(
    (pageNumber: number) => {
      if (!isLoading && pageNumber >= 1 && pageNumber <= totalPages) {
        fetchList(currentQuery, pageNumber);
      }
    },
    [totalPages, isLoading, currentQuery, fetchList]
  );

  return {
    movies,
    isLoading,
    error,
    currentPage,
    totalPages,
    currentQuery,
    isSearch,
    goToPage,
  };
};
