import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import HeaderLanding from './components/HeaderLanding';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const CurrentHeader = isHomePage ? HeaderLanding : Header;

  return (
    <div className='app-container'>
      <CurrentHeader />

      <main className='main-content'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
