import type { Movie } from "@domain/Movie";

export interface MovieCardProps {
  movie: Movie;
  highlightTerm?: string;
}
