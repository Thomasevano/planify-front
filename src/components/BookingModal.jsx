import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

function BookingModal({ visible, setVisible }) {
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Réserver un créneau
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Calendrier avec horaires disponibles</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fermer
          </Button>
          <Button auto onPress={closeHandler}>
            Confirmer la réservation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingModal;
