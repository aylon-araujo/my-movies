import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import { AppProvider } from './context/AppProvider';
import Header from './presentation/components/Header';
import './App.css';

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