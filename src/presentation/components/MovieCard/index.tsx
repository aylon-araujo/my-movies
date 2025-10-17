import React from 'react';
import type { Movie } from '../../../models/Movie';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import Button from '../Button';
import { MainRoutes } from '../../../routes/Main/routes';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

interface MovieCardProps {
  movie: Movie;
  favoriteButton?: React.ReactNode;
  highlightTerm?: string;
  onClick?: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, favoriteButton, highlightTerm, onClick }) => {
  const navigate = useNavigate();
  const imageUrl = movie.poster_path 
    ? `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}` 
    : '';

  const handleCardClick = () => {
    if (onClick) {
      navigate(`${MainRoutes.MOVIE_DETAIL}/${movie.id}`);
    }
  };

  const getHighlightedTitle = (title: string, term?: string) => {
    if (!term) return title;
    const parts = title.split(new RegExp(`(${term})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={index} className={styles.highlight}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={styles.movieCard} onClick={handleCardClick} role="button" tabIndex={0}>
      <div className={styles.posterContainer}>
        <img src={imageUrl} alt={`Poster do filme ${movie.title}`} className={styles.poster} />
        <div className={styles.favoriteButtonOverlay}>
          {favoriteButton || (
            <Button variant="danger" size="small" className={styles.defaultFavoriteButton}>
              <FaHeart />
            </Button>
          )}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{getHighlightedTitle(movie.title, highlightTerm)}</h3>
        <div className={styles.rating}>
          {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
