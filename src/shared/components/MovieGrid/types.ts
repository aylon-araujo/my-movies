import type { Movie } from '@domain/Movie';

export interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  title?: string;
  emptyMessage: string;
  highlightTerm?: string;
}
