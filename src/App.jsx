import React, { useEffect, useState } from 'react'
import './App.css'
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalNavbar from './components/GlobalNavbar';
import authService from './services/auth.service';
import { Routes, Route } from 'react-router-dom';
import ShopList from './components/ShopList';
import LoginModal from './components/Modals/LoginModal';
import Register from './components/Modals/RegisterModal';
import ProfilPage from './pages/ProfilPage';
import { CurrentUserProvider } from './CurrentUserContext';

function App() {
  const [shops, setShops] = useState([])
  const [inputText, setInputText] = useState("");
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, [])

  return (
    <div className="App">
      <CurrentUserProvider>
        <LoginModal loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} />
        <Register registerModalVisible={registerModalVisible} setRegisterModalVisible={setRegisterModalVisible} />
        <GlobalNavbar
          setInputText={setInputText}
          setLoginModalVisible={setLoginModalVisible}
          setRegisterModalVisible={setRegisterModalVisible}
        />
        <Routes>
          <Route path="/" element={<ShopList shops={shops} inputText={inputText} />} />
          <Route path="/profile" element={<ProfilPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </CurrentUserProvider>
    </div>
  )
}

export default App
