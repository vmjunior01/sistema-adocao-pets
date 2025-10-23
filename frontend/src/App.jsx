import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className='layout-flex-container'>
      <Header />

      <main className='content-grow'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
