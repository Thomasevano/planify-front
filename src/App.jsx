import React, { useEffect, useState } from 'react'
import './App.css'
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalNavbar from './components/GlobalNavbar';
import authService from './services/auth.service';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ShopList from './components/ShopList';
import LoginModal from './components/Modals/LoginModal';
import Register from './components/Modals/RegisterModal';

function App() {
  const [shops, setShops] = useState([])
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, [])

  useEffect(() => {
    async function fetchCurrentUser() {
      const user = await authService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    }
    fetchCurrentUser();
  }, []);


  function logout() {
    authService.logout();
    setCurrentUser(null);
    navigate("/");
  }

  return (
    <div className="App">
      <GlobalNavbar
        setInputText={setInputText}
        currentUser={currentUser}
        setLoginModalVisible={setLoginModalVisible}
        setRegisterModalVisible={setRegisterModalVisible}
        logout={logout}
      />
      <Routes>
        <Route path="/" element={<ShopList shops={shops} inputText={inputText} />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <LoginModal loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} />
      <Register registerModalVisible={registerModalVisible} setRegisterModalVisible={setRegisterModalVisible} />
    </div>
  )
}

export default App
