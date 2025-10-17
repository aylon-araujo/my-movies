import React from 'react';
import type { Movie } from '../../../models/Movie'; 
import { useFavorites } from '../../../hooks/useFavorites';
import { FaHeart } from 'react-icons/fa'; 
import styles from './MovieCard.module.scss';
import Button from '../Button'; 
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from '../../../routes/Main/routes';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; 

interface MovieCardProps {
  movie: Movie;
  highlightTerm?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, highlightTerm }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id); 

  const imageUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` 
    : 'https://via.placeholder.com/200x300?text=Sem+Poster';

  const handleCardClick = () => {
    navigate(`${MainRoutes.MOVIE_DETAIL.replace(':id', String(movie.id))}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    toggleFavorite(movie);
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
          <Button 
            variant={favorite ? "danger" : "ghost"} 
            size="small" 
            className={styles.defaultFavoriteButton}
            onClick={handleFavoriteClick} 
          >
            <FaHeart color={favorite ? 'white' : 'currentColor'} /> 
          </Button>
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