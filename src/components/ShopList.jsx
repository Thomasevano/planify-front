import React from "react";
import { useState } from "react";
import { Container, Card, Row, Button, Text } from "@nextui-org/react";
import BookingModal from "./Modals/BookingModal";
import { useCurrentUser } from "../CurrentUserContext";
import RetailerModal from "./Modals/RetailerModal";

function ShopList({ shops, inputText = '' }) {
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const { currentUser } = useCurrentUser();
  const [isRetailerModalVisible, setIsRetailerModalVisible] = useState(false);

  function bookingModalHandler(shopId) {
    setIsBookingModalVisible(true);
    setSelectedShopId(shopId);
  }

  function retailerModalHandler(shopId) {
    setIsRetailerModalVisible(true);
    setSelectedShopId(shopId);
  }

  const filteredShops = shops.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.ShopName.toLowerCase().includes(inputText);
    }
  })



  return (
    <Container css={{ d: 'flex', flexWrap: 'wrap' }}>
      {filteredShops.map((shop) => (
        <React.Fragment key={shop.ID}>
          <Card variant="bordered" css={{ mw: "250px", margin: "16px" }}>
            <Card.Header>
              <Text b>{shop.ShopName}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text b>{shop.Description}</Text>
              <Text>{shop.PhoneNumber}</Text>
              <Text>{shop.Address}</Text>
            </Card.Body>
            <Card.Footer>
              <Row justify="center">
                {currentUser && currentUser.id === shop.UserId
                  ?
                  <Button size="md" onPress={() => retailerModalHandler(shop.ID)}>Voir les rendez-vous</Button>
                  :
                  <Button size="md" onPress={() => bookingModalHandler(shop.ID)}>Prendre rendez-vous</Button>
                }
              </Row>
            </Card.Footer>
          </Card>
          {isBookingModalVisible &&
            <BookingModal visible={isBookingModalVisible} setVisible={setIsBookingModalVisible} selectedShopId={selectedShopId} setSelectedShopId={setSelectedShopId} />
          }
          {isRetailerModalVisible &&
            <RetailerModal visible={isRetailerModalVisible} setVisible={setIsRetailerModalVisible} selectedShopId={selectedShopId} setSelectedShopId={setSelectedShopId} />
          }
        </React.Fragment>
      ))}
    </Container>
  )
}

export default ShopList
