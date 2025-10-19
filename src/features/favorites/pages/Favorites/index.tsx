import React, { useState, useMemo } from "react";
import MovieGrid from "@shared/components/MovieGrid";
import Button from "@shared/components/Button";
import SortSelect from "@shared/components/SortSelect";
import If from "@shared/components/If";
import { FaArrowRight } from "react-icons/fa";
import styles from "./FavoritesPage.module.scss";
import { Link } from "react-router-dom";
import { MainRoutes } from "@app/routes/Main/routes";
import type { Movie } from "@domain/Movie";
import { useFavorites } from '../../hooks/useFavorites';
import Divider from "@shared/components/Divider";


type SortOption = "title_asc" | "title_desc" | "rating_desc" | "rating_asc";
type SortCriteria = "title" | "vote_average" | null;
type SortDirection = "asc" | "desc";

const EmptyState: React.FC = () => (
  <div className={styles.emptyState}>
    <img
      src="https://via.placeholder.com/300x200?text=Lista+Vazia"
      alt="Lista de favoritos vazia"
      className={styles.emptyImage}
    />
    <p className={styles.emptyMessage}>
      Parece que você ainda não adicionou nenhum filme aos seus favoritos.
    </p>
    <Link to={MainRoutes.HOME} className={styles.ctaLink}>
      <Button variant="primary" size="large">
        Explorar Filmes <FaArrowRight />
      </Button>
    </Link>
  </div>
);

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [sortOption, setSortOption] = useState<SortOption>("title_asc");

  const getSortParams = (
    option: SortOption
  ): { criteria: SortCriteria; direction: SortDirection } => {
    const [criteriaPart, direction] = option.split("_");
    const criteria: SortCriteria =
      criteriaPart === "title" ? "title" : "vote_average";
    return { criteria, direction: direction as SortDirection };
  };

  const sortedFavorites = useMemo(() => {
    if (favorites.length === 0) return favorites;

    const { criteria: sortBy, direction: sortDirection } =
      getSortParams(sortOption);

    return [...favorites].sort((a: Movie, b: Movie) => {
      let comparison = 0;

      if (sortBy === "title") {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        comparison = titleA.localeCompare(titleB);
      } else if (sortBy === "vote_average") {
        const ratingA = a.vote_average || 0;
        const ratingB = b.vote_average || 0;
        comparison = ratingA - ratingB; // ASC
      }

      if (sortDirection === "desc") {
        return -comparison;
      }
      return comparison;
    });
  }, [favorites, sortOption]);

  const HAS_FAVORITE = favorites.length > 0;

  return (
    <div className={styles.favoritesPageContainer}>
      <h1 className={styles.title}>
        Meus Filmes Favoritos
      </h1>
      <If condition={HAS_FAVORITE}>
        <div className={styles.sortControlContainer}>
          <SortSelect
            currentOption={sortOption as SortOption}
            onSortChange={
              setSortOption as React.Dispatch<React.SetStateAction<SortOption>>
            }
          />
        </div>
      </If>
      <Divider size='large' />
      <If condition={!HAS_FAVORITE}>
        <EmptyState />
      </If>
      <If condition={HAS_FAVORITE}>
        <MovieGrid
          movies={sortedFavorites}
          isLoading={false}
          error={null}
          currentPage={1}
          totalPages={1}
          emptyMessage="Nenhum filme favorito."
        />
      </If>
    </div>
  );
};

export default FavoritesPage;
