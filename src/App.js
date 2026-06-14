
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import Home_page from './Components/Home_page/Home_page';
import { Route, Routes, useLocation } from 'react-router-dom';
import Smart_token_staking from './Components/Smart_token_staking/Smart_token_staking';
import Airdrops from './Components/AirDrops/AirDrops';
import { useWalletReady } from './hooks/useWalletReady';

function App() {
  const location = useLocation();
  const walletReady = useWalletReady();
  const isLoginScreen = location.pathname === '/' && !walletReady;

  return (
    <div className={`App app-modern${isLoginScreen ? ' app-login-only' : ''}`}>
      <Toaster />
      {!isLoginScreen && <Header />}
      <Routes>
        <Route path='/' element={<Home_page />} />
        <Route path='/Earn-rewards-staking' element={<Smart_token_staking />} />
        <Route path='/Earn-free-reals-tokens-airdrops' element={<Airdrops />} />
      </Routes>
      {!isLoginScreen && <Footer />}
    </div>
  );
}

export default App;
