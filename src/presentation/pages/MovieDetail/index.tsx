import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../../../services/http/MovieApi";
import { useFavorites } from "../../../hooks/useFavorites";
import type { Movie } from "../../../models/Movie";

import Button from "../../components/Button";
import { FaHeart } from "react-icons/fa";
import styles from "./MovieDetail.module.scss";
import If from "../../components/If";

const TMDB_IMAGE_BASE_URL_LARGE = "https://image.tmdb.org/t/p/w1280";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : undefined;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = movie ? isFavorite(movie.id) : false;

  const fetchMovie = useCallback(async (mid: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieApi.getMovieDetail(mid);
      setMovie(data);
    } catch (err) {
      setError("Não foi possível carregar os detalhes do filme.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (movieId) {
      fetchMovie(movieId);
    } else {
      setError("ID de filme inválido.");
      setLoading(false);
    }
  }, [movieId, fetchMovie]);

  const handleFavoriteClick = () => {
    if (movie) {
      toggleFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando detalhes do filme...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Erro: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.errorContainer}>
        <p>Filme não encontrado.</p>
      </div>
    );
  }

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL_LARGE}${movie.backdrop_path}`
    : undefined;
  const genres = (movie as any).genres?.map((g: any) => g.name) || [];

  return (
    <div className={styles.detailPage}>
      <div className={styles.contentContainer}>
        <div className={styles.posterWrapper}>
          <If condition={!!backdropUrl && backdropUrl.length > 0}>
            <img
              src={backdropUrl}
              alt={`Poster de ${movie.title}`}
              className={styles.poster}
            />
          </If>
          <If condition={!backdropUrl}>
            <div className={styles.noPoster}>Sem Poster</div>
          </If>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.genres}>
            {genres.map((genre: string, index: number) => (
              <span key={index} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>

          <p className={styles.metadata}>
            Data de lançamento:{" "}
            <span className={styles.dataValue}>{releaseDate}</span>
          </p>
          <p className={styles.metadata}>
            Nota TMDB:
            <span className={styles.ratingBadge}>
              {movie.vote_average.toFixed(1)}
            </span>
          </p>

          <h2 className={styles.sectionTitle}>Sinopse</h2>
          <p className={styles.overview}>
            {movie.overview || "Sinopse não disponível."}
          </p>

          <Button
            variant={favorite ? "danger" : "secondary"}
            size="large"
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            <FaHeart />
            {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
