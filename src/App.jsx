import { useEffect, useState } from 'react'
import './App.css'
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalNavbar from './components/GlobalNavbar.jsx';
import ShopList from './components/ShopList.jsx';
import authService from './services/auth.service';

function App() {
  const [shops, setShops] = useState([])
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, [])

  return (
    <div className="App">
      <GlobalNavbar setInputText={setInputText} currentUser={currentUser} />
      <ShopList shops={shops} inputText={inputText} />
    </div >
  )
}

export default App
