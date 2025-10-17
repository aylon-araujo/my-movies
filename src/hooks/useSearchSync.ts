import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { MainRoutes } from '../routes/Main/routes';

const DEBOUNCE_DELAY = 500;

interface UseSearchSyncReturn {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleNavigationClick: (path: string) => void;
}

export const useSearchSync = (): UseSearchSyncReturn => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, DEBOUNCE_DELAY);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentPath = location.pathname;
  const currentUrlQuery = searchParams.get('q') || '';

  const handleNavigationClick = useCallback((path: string) => {
    setSearchTerm('');
    navigate(path);
  }, [navigate]);

  useEffect(() => {
    if (currentPath === MainRoutes.SEARCH_MOVIES) {
      if (currentUrlQuery && currentUrlQuery !== searchTerm) {
        setSearchTerm(decodeURIComponent(currentUrlQuery)); 
      } else if (!currentUrlQuery && searchTerm) {
        setSearchTerm('');
      }
    }
    else if (searchTerm) {
        setSearchTerm('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, currentUrlQuery]); 

  useEffect(() => {
    const query = debouncedSearchTerm.trim();

    if (query.length > 0) {
      if (query !== searchTerm) return;

      if (query !== decodeURIComponent(currentUrlQuery)) {
        console.log(`[NAV HOOK] Redirecionando para busca: ${query}`);
        navigate(`${MainRoutes.SEARCH_MOVIES}?q=${encodeURIComponent(query)}`);
      }
    } 

  }, [debouncedSearchTerm, navigate, currentPath, currentUrlQuery, searchTerm]);


  return {
    searchTerm,
    setSearchTerm,
    handleNavigationClick,
  };
};
