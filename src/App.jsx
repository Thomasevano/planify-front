import { useEffect, useState } from 'react'
import './App.css'
import GlobalNavbar from './components/GlobalNavbar.jsx';
import ShopList from './components/ShopList.jsx';
import 'react-day-picker/dist/style.css';

function App() {
  const [shops, setShops] = useState([])
  const [inputText, setInputText] = useState("");

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/shops`)
    .then(response => response.json())
    .then(json => setShops(json))
  }, [])
  
return (
  <div className="App">
    <GlobalNavbar setInputText={setInputText} />
    <ShopList shops={shops} inputText={inputText} />
  </div >
)
}

export default App
