import React from "react";
import { useLocation } from "react-router-dom";

import { MainRoutes } from "@app/routes/Main/routes";
import { useSearchSync } from "@features/movies/hooks/useSearchSync";

import Button from "../Button";
import InputSearch from "../InputSearch";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm, handleNavigationClick } = useSearchSync();

  const location = useLocation(); 
  const currentPath = location.pathname;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getButtonVariant = (path: string): 'primary' | 'ghost' => {
    if (path === MainRoutes.HOME && currentPath === MainRoutes.HOME) {
      return 'primary';
    }
    if (path !== MainRoutes.HOME && currentPath.startsWith(path)) {
      return 'primary';
    }
    return 'ghost';
  };

  return (
    <header className={styles.headerPage}>
      <div onClick={() => handleNavigationClick(MainRoutes.HOME)} className={styles.logoHeader}>
        <span>MovieDB</span>
      </div>

      <InputSearch 
        value={searchTerm}
        onInputChange={handleInputChange} 
      />

      <ul className={styles.navigation}>
        <li>
          <Button 
            onClick={() => handleNavigationClick(MainRoutes.HOME)}
            variant={getButtonVariant(MainRoutes.HOME)} 
          >
            Home
          </Button>
        </li>
        <li>
          <Button 
            onClick={() => handleNavigationClick(MainRoutes.FAVORITES_MOVIES)}
            variant={getButtonVariant(MainRoutes.FAVORITES_MOVIES)}
          >
            Favoritos
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
