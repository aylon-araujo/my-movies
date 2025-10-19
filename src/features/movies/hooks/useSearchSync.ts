import { useCallback,useEffect, useState } from 'react';
import { useLocation,useNavigate, useSearchParams } from 'react-router-dom';

import { MainRoutes } from '@app/routes/Main/routes';
import { useDebounce } from '@shared/hooks/useDebounce';

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
    navigate(path);
  }, [navigate]);

  useEffect(() => {
    if (currentUrlQuery && searchTerm.length > 0) {
      setSearchTerm(decodeURIComponent(currentUrlQuery)); 
    } else if (searchTerm) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    handleNavigationClick,
  };
};
