import { createContext } from 'react';
import type { Movie } from '@domain/Movie';

export interface FavoritesContextType {
  favorites: Movie[];
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
}

export const defaultContextValue: FavoritesContextType = {
  favorites: [],
  isFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
};

export const FavoritesContext = createContext<FavoritesContextType>(defaultContextValue);
