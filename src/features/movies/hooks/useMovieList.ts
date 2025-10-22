import { useCallback, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

import type { Movie, MovieSearchResponse } from "@domain/Movie";

import { movieApi } from "../services/MovieApi";

interface MovieListState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: MovieListState = {
  movies: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

type Action =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { data: MovieSearchResponse; pageToLoad: number };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_PAGE"; payload: number };

function movieListReducer(
  state: MovieListState,
  action: Action
): MovieListState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "FETCH_SUCCESS": {
      const { data, pageToLoad } = action.payload;

      const newTotalPages = data.total_pages > 500 ? 500 : data.total_pages;

      const newMovies =
        pageToLoad === 1
          ? data.results
          : [
              ...state.movies,
              ...data.results.filter(
                (newMovie) => !state.movies.some((m) => m.id === newMovie.id)
              ),
            ];

      return {
        ...state,
        movies: newMovies,
        currentPage: pageToLoad,
        totalPages: newTotalPages,
        isLoading: false,
      };
    }

    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
}

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
  const currentQuery = searchParams.get("q") || "";
  const isSearch = currentQuery.trim().length > 0;

  const [state, dispatch] = useReducer(movieListReducer, initialState);
  const { movies, isLoading, error, currentPage, totalPages } = state;

  const fetchList = useCallback(
    async (query: string, pageToLoad: number) => {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await movieApi.fetchMoviesList(query, pageToLoad);

        dispatch({
          type: "FETCH_SUCCESS",
          payload: { data, pageToLoad },
        });
      } catch (err) {
        console.error("Erro ao buscar lista de filmes:", err);
        const errorMessage = `Erro ao carregar filmes. ${isSearch ? `Busca: "${query}"` : "Populares"}.`;

        dispatch({
          type: "FETCH_ERROR",
          payload: errorMessage,
        });
      }
    },
    [isSearch]
  );

  useEffect(() => {
    fetchList(currentQuery, 1);
    dispatch({ type: "SET_PAGE", payload: 1 });
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
