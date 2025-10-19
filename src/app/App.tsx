import { BrowserRouter } from 'react-router-dom';

import './styles/App.css';

import { AppProvider } from '@app/providers/AppProvider';
import { AppRouter } from '@app/routes';
import { Divider, Header } from '@shared/components';


function App() {
  return (
    <BrowserRouter> 
      <AppProvider>
        <Header />
        <Divider />
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App