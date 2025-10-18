import type { Movie, MovieSearchResponse } from "@domain/Movie";
import { ConnectionProvider } from "@shared/services/http/ConnectionProvider";
import type { AxiosInstance } from 'axios';

const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_ENDPOINT;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY; 

export class MovieApi extends ConnectionProvider {
  static fetchMoviesList(term: string, pageNum: number) {
    const data = { term, pageNum }
    throw new Error(`Method not implemented. ${data}`);
  }
  protected readonly api: AxiosInstance;

  constructor() {
    super({
      externalApiUrl: MOVIE_API_URL,
      prefix: '3',
    });
    
    this.api = this.getInstance();

    this.api.interceptors.request.use(config => {
      config.params = {
        ...config.params,
        api_key: MOVIE_API_KEY,
        language: 'pt-BR',
      };
      return config;
    });
  }

  public async fetchMoviesList(
    query?: string,
    pageNum: number = 1
  ): Promise<MovieSearchResponse> {
    const isSearch = query && query.trim().length > 0;
    const endpoint = isSearch ? '/search/movie' : '/movie/popular';
    const params: { [key: string]: any } = { 
      page: pageNum 
    };

    if (isSearch) {
      params.query = query;
    }

    if (!isSearch && endpoint === '/search/movie') {
        return { page: 0, results: [], total_pages: 0, total_results: 0 }; 
    }

    try {
      const response = await this.api.get<MovieSearchResponse>(endpoint, {
        params: params,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar filmes no TMDB:', error);
      throw error;
    }
  }

  public async getMovieDetail(movieId: number): Promise<Movie> {
    try {
      const response = await this.api.get<Movie>(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to load movie details ${movieId}:`, error);
      throw error; 
    }
  }
}

export const movieApi = new MovieApi();
