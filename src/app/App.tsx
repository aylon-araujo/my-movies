import { BrowserRouter } from 'react-router-dom';

import './styles/App.css';

import { AppProvider } from '@app/providers/AppProvider';
import { AppRouter } from '@app/routes';
import Divider from '@shared/components/Divider';
import Header from '@shared/components/Header';


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