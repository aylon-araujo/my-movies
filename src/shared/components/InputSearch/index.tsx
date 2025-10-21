import React from "react";

import styles from './InputSearch.module.scss';
import type { InputSearchProps } from "./InputSearch.types";


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
