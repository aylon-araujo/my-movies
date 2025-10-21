import { Route, Routes } from 'react-router-dom';

import FavoritePage from '@features/favorites/pages/Favorites'
import HomePage from '@features/movies/pages/Home';
import MovieDetail from '@features/movies/pages/MovieDetail';
import SearchResult from '@features/movies/pages/SearchResult';
import NotFound from '@shared/components/NotFound';

import { MainRoutes as RT } from './routes';

export function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path={RT.HOME} element={<HomePage />} />
        <Route path={RT.MOVIE_DETAIL} element={<MovieDetail />} />
        <Route path={RT.FAVORITES_MOVIES} element={<FavoritePage />} />
        <Route path={RT.SEARCH_MOVIES} element={<SearchResult />} />
        <Route path={RT.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}
