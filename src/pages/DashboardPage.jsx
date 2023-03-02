import React, { useEffect , useState } from "react";
import { Text } from "@nextui-org/react";
import { useCurrentUser } from "../CurrentUserContext";
import ShopList from '../components/ShopList';
import { getData } from "../helpers/requestData";
import authService from "../services/auth.service";

function DashboardPage() {
  const { currentUser } = useCurrentUser();
  const [shops, setShops] = useState([]);
  const userToken = authService.getToken();

  useEffect(() => {
    async function fetchData() {
      await getData(`${import.meta.env.VITE_API_URL}/users/shops/${currentUser.id}`, userToken)
      .then(json => setShops(json))
    }

    fetchData();
  }, []);

  return (
    <>
      <Text h1 align="center" css={{ margin:"1.25rem 0" }}>Vos cabinets</Text>
      <ShopList shops={shops} />
    </>
  );
}

export default DashboardPage;