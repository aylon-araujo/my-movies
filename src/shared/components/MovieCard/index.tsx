import React, { useCallback } from "react"; // Importar useCallback
import { FaHeart, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { MainRoutes } from "@app/routes/Main/routes";
import { useFavorites } from "@features/favorites/hooks/useFavorites";
import { useSearchSync } from "@features/movies/hooks/useSearchSync";

import { Button } from "../Button";
import styles from "./MovieCard.module.scss";
import type { MovieCardProps } from "./MovieCard.types";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  highlightTerm,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { handleNavigationClick } = useSearchSync();
  const location = useLocation();

  const isFavoritesPage = location.pathname === MainRoutes.FAVORITES_MOVIES;
  const favorite = isFavorite(movie.id);

  const imageUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Poster";

  const handleCardClick = useCallback(() => {
    handleNavigationClick(
      `${MainRoutes.MOVIE_DETAIL.replace(":id", String(movie.id))}`
    );
  }, [handleNavigationClick, movie.id]);

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(movie);
    },
    [toggleFavorite, movie]
  );

  const getHighlightedTitle = (title: string, term?: string) => {
    if (!term) return title;
    const parts = title.split(new RegExp(`(${term})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div
      className={styles.movieCard}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.posterContainer}>
        <img
          src={imageUrl}
          alt={`Poster do filme ${movie.title}`}
          className={styles.poster}
        />

        <div className={styles.favoriteButtonOverlay}>
          <Button
            aria-label={
              isFavoritesPage
                ? "removeFavorite"
                : favorite
                  ? "removeFavorite"
                  : "addFavorite"
            }
            variant={isFavoritesPage ? "ghost" : favorite ? "danger" : "ghost"}
            size="small"
            className={styles.defaultFavoriteButton}
            onClick={handleFavoriteClick}
          >
            {isFavoritesPage ? (
              <FaTrash color="white" />
            ) : (
              <FaHeart color={favorite ? "red" : "currentColor"} />
            )}
          </Button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>
          {getHighlightedTitle(movie.title, highlightTerm)}
        </h3>
        <div className={styles.rating}>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
      </div>
    </div>
  );
};
