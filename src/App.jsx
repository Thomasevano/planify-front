import React, { useState } from 'react'
import './App.css'
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalNavbar from './components/GlobalNavbar';
import LoginModal from './components/Modals/LoginModal';
import Register from './components/Modals/RegisterModal';
import CreateCabinetModal from "./components/Modals/CreateCabinetModal";
import { CurrentUserProvider } from './CurrentUserContext';
import Router from './Router';

function App() {
  const [inputText, setInputText] = useState("");
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [createCabinetModalVisible, setCreateCabinetModalVisible] = useState(false);

  return (
    <div className="App">
      <CurrentUserProvider>
        <LoginModal loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} />
        <Register registerModalVisible={registerModalVisible} setRegisterModalVisible={setRegisterModalVisible} />
        <CreateCabinetModal createCabinetModalVisible={createCabinetModalVisible} setCreateCabinetModalVisible={setCreateCabinetModalVisible} />
        <GlobalNavbar
          setInputText={setInputText}
          setLoginModalVisible={setLoginModalVisible}
          setRegisterModalVisible={setRegisterModalVisible}
          setCreateCabinetModalVisible={setCreateCabinetModalVisible}
        />
        <Router inputText={inputText} />
      </CurrentUserProvider>
    </div>
  )
}

export default App
