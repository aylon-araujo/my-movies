export const MainRoutes = {
  HOME: '/',
  MOVIE_DETAIL: '/movie/:id',
  FAVORITES_MOVIES: '/favorites',
  SEARCH_MOVIES: '/search',
  NOT_FOUND: '*',
}

export type MainRouteKeys = keyof typeof MainRoutes;
export type MainRouteValues = (typeof MainRoutes)[MainRouteKeys];
