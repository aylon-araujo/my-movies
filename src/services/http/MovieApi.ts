import type { MovieSearchResponse } from "../../models/Movie";
import { ConnectionProvider } from "./ConnectionProvider";
import type { AxiosInstance } from 'axios';


const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_ENDPOINT;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY; 

export class MovieApi extends ConnectionProvider {
  static searchMoviesByTitle(term: string, pageNum: number) {
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

  public async searchMoviesByTitle(
    query: string, 
    pageNum: number = 1
  ): Promise<MovieSearchResponse> {
    if (!query) {
        return { page: 0, results: [], total_pages: 0, total_results: 0 }; 
    }

    try {
      const response = await this.api.get<MovieSearchResponse>('/search/movie', {
        params: {
          query: query,
          page: pageNum,
        },
      });

      return response.data; 
    } catch (error) {
      console.error('Erro ao pesquisar filmes no TMDB:', error);
      throw error; 
    }
  }
}

export const movieApi = new MovieApi();
