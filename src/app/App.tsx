import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/routes';
import { AppProvider } from '@app/providers/AppProvider';
import Header from '@shared/components/Header';
import './styles/App.css';


function App() {
  return (
    <BrowserRouter> 
      <AppProvider>
        <Header /> 
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App