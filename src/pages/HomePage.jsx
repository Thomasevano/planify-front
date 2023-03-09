import React, { useEffect, useState } from "react";
import ShopList from '../components/ShopList';
import { Text } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';

export default function HomePage({ inputText }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Text h1 align="center" css={{ margin: "1.25rem 0" }}>Choisissez un praticien</Text>
      <ShopList shops={shops} inputText={inputText} />
    </>
  )
}