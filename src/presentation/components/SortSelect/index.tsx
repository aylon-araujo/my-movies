import styles from "./SortSelect.module.scss";

type SortOption = "title_asc" | "title_desc" | "rating_desc" | "rating_asc";

const SortSelect: React.FC<{
  currentOption: SortOption;
  onSortChange: (option: SortOption) => void;
}> = ({ currentOption, onSortChange }) => {
  const options: { value: SortOption; label: string }[] = [
    { value: "title_asc", label: "Título (A-Z)" },
    { value: "title_desc", label: "Título (Z-A)" },
    { value: "rating_desc", label: "Nota (Maior)" },
    { value: "rating_asc", label: "Nota (Menor)" },
  ];

  return (
    <div className={styles.sortControlContainer}>
      <label htmlFor="sort-favorites" className={styles.filterLabel}>
        Ordenar por:
      </label>
      <select
        id="sort-favorites"
        className={styles.sortSelect}
        value={currentOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
