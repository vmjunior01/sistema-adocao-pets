import { useLocation, Outlet } from 'react-router-dom'; // <--- Importe useLocation
import Header from './components/Header'; // O Header Padrão
import HeaderLanding from './components/HeaderLanding'; // O Header Único da Home
import Footer from './components/Footer'; 
import LandingPage from './components/LandingPage';

export default function App() {
  const location = useLocation(); // <--- Pega a informação da URL atual
  
  // 1. Variável booleana para verificar se é a página principal (URL raiz "/")
  const isHomePage = location.pathname === '/'; 

  // 2. Decide qual componente Header usar
  const CurrentHeader = isHomePage ? HeaderLanding : Header;

  return (
    <div className="app-container">
      
      {/* 3. Renderiza o Header selecionado */}
      <CurrentHeader /> 
      
      <main className="main-content">
        {/* <Outlet />  */}
        <LandingPage />
      </main>
      
      <Footer/>
    </div>
  );
}