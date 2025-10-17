import { Route, Routes } from 'react-router-dom';
import { MainRoutes as RT } from './routes';
import SearchPage from '../../presentation/pages/SearchResult';
import MovieDetail from '../../presentation/pages/MovieDetail';

export function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path={RT.HOME} element={<h1>Main</h1>} />
        <Route path={RT.MOVIE_DETAIL} element={<MovieDetail />} />
        <Route path={RT.FAVORITES_MOVIES} element={<h1>Favorites</h1>} />
        <Route path={RT.SEARCH_MOVIES} element={<SearchPage />} />
        <Route path={RT.NOT_FOUND} element={<h1>404 NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
}
