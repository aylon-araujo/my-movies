import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDebounce } from '../../../hooks/useDebounce';
import InputSearch from "../InputSearch";
import Button from "../Button";
import styles from "./styles.module.scss";

const DEBOUNCE_DELAY = 500;

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, DEBOUNCE_DELAY);
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Lógica de pesquisa da API
      console.log(`[DEBOUNCED] Nova Pesquisa acionada com: "${debouncedSearchTerm}"`);
      // Ex: navigate(`/search/${debouncedSearchTerm}`);
    } else {
      // Limpar resultados
      console.log("[DEBOUNCED] Campo de pesquisa limpo.");
    }
  }, [debouncedSearchTerm, navigate]);

  const getButtonVariant = (path: string): 'primary' | 'ghost' => {
    if (path === '/' && currentPath === '/') {
      return 'primary';
    }
    if (path !== '/' && currentPath.startsWith(path)) {
      return 'primary';
    }
    return 'ghost';
  };

  return (
    <header className={styles.headerPage}>
      <div className={styles.logoHeader}>
        <span>MovieDB</span>
      </div>

      <InputSearch 
        value={searchTerm}
        onInputChange={handleInputChange} 
      />

      <div className={styles.navigation}>
        <Button 
          onClick={() => navigate('/')}
          variant={getButtonVariant('/')}
        >
          Home
        </Button>
        <Button 
          onClick={() => navigate('/favorites')}
          variant={getButtonVariant('/favorites')}
        >
          Favoritos
        </Button>
      </div>
    </header>
  );
};

export default Header;
