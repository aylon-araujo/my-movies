import { useContext } from 'react';
import { 
    FavoritesContext, 
    defaultContextValue, 
    type FavoritesContextType
} from '@features/favorites/context/Favorites/FavoritesContext'; 

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  
  if (context === defaultContextValue) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};