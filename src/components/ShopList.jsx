import { useState } from "react";
import { Container, Card, Row, Button, Text } from "@nextui-org/react";
import BookingModal from "./BookingModal";

function ShopList({ shops, inputText }) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

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
    <Container gap={1} css={{ d: 'flex', flexWrap: 'wrap' }}>
      {filteredShops.map((shop) => (
        <Card key={shop.ID} isHoverable variant="bordered" css={{ mw: "300px", margin: "5px" }}>
          <Card.Header>
            <Text b>{shop.ShopName}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
              {shop.Address}
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" shadow onPress={handler}>Réserver</Button>
            </Row>
          </Card.Footer>
        </Card>
      ))}
      <BookingModal visible={visible} setVisible={setVisible} />
    </Container>
  )
}

export default ShopList
