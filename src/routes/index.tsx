import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './Main';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}
