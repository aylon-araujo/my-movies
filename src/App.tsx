// src/App.tsx (Corrigido)
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import Header from './presentation/components/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter> 
      <Header /> 
      <AppRouter />
    </BrowserRouter>
  )
}

export default App