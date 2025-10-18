import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FavoritesContext } from './FavoritesContext';
import type { Movie } from '@domain/Movie';

const STORAGE_KEY = '@MovieDB:Favorites';

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  }, []);

  useEffect(() => {
    try {
      if (favorites.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error('Erro ao salvar favoritos:', err);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (movieId: number) => favorites.some(movie => movie.id === movieId),
    [favorites]
  );

  const addFavorite = useCallback(
    (movie: Movie) => {
      if (!isFavorite(movie.id)) {
        setFavorites(prev => [...prev, movie]);
      }
    },
    [isFavorite]
  );

  const removeFavorite = useCallback(
    (movieId: number) => {
      setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    },
    []
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
