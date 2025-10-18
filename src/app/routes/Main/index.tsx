import { Route, Routes } from 'react-router-dom';
import { MainRoutes as RT } from './routes';
import SearchResult from '@features/movies/pages/SearchResult';
import MovieDetail from '@features/movies/pages/MovieDetail';
import HomePage from '@features/movies/pages/Home';
import FavoritesPage from '@features/favorites/pages/Favorites'

export function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path={RT.HOME} element={<HomePage />} />
        <Route path={RT.MOVIE_DETAIL} element={<MovieDetail />} />
        <Route path={RT.FAVORITES_MOVIES} element={<FavoritesPage />} />
        <Route path={RT.SEARCH_MOVIES} element={<SearchResult />} />
        <Route path={RT.NOT_FOUND} element={<h1>404 NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
}
