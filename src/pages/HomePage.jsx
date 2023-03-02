import React, { useEffect, useState } from "react";
import ShopList from '../components/ShopList';
import { Container, Text } from "@nextui-org/react";

export default function HomePage({ inputText }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops`)
      .then(response => response.json())
      .then(json => setShops(json))
  }, []);

  return (
    <>
      <Text h1 align="center" css={{ margin:"1.25rem 0" }} >Choisissez un pratiquant</Text>
      <ShopList shops={shops} inputText={inputText} />
    </>
  )
}