import React, { useEffect, useState } from "react";
import ShopList from '../components/ShopList';

export default function HomePage({ inputText }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ShopList shops={shops} inputText={inputText} />
    </div>
  )
}