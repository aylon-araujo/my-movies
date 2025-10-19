import React from 'react';

import { FavoritesProvider } from '@features/favorites/context/Favorites/FavoritesProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  );
};
