import React from "react";

import styles from './styles.module.scss';

interface InputSearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string
}

export const InputSearch: React.FC<InputSearchProps> = ({ onInputChange, value }) => {
  return (
    <div className={styles.inputSearchWrapper}>
      <input
        id="input-search"
        type="text"
        value={value}
        placeholder="Buscar filmes..."
        className={styles.inputSearch}
        onChange={onInputChange}
      />
    </div>
  );
};
