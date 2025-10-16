import { Route, Routes } from 'react-router-dom';
import { MainRoutes as RT } from './routes';

export function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path={RT.HOME} element={<h1>Main</h1>} />
        <Route path={RT.MOVIE_DETAIL} element={<h1>Detail</h1>} />
        <Route path={RT.FAVORITES_MOVIES} element={<h1>Favorites</h1>} />
        <Route path={RT.SEARCH_MOVIES} element={<h1>Search</h1>} />
        <Route path={RT.NOT_FOUND} element={<h1>404 NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
}
