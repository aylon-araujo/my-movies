import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/routes';
import { AppProvider } from '@app/providers/AppProvider';
import Header from '@shared/components/Header';
import Divider from '@shared/components/Divider';
import './styles/App.css';


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