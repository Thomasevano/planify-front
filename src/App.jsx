import { useEffect, useState } from 'react'
import './App.css'
import GlobalNavbar from './components/GlobalNavbar.jsx';
import ShopList from './components/ShopList.jsx';

function App() {
  const [shops, setShops] = useState([])
  const [inputText, setInputText] = useState("");

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
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
