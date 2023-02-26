import React from "react";
import { Text, Modal } from "@nextui-org/react";
import RegisterForm from "../components/RegisterForm";

function Register({ registerModalVisible, setRegisterModalVisible }) {
  const closeRegisterHandler = () => {
    setRegisterModalVisible(false);
  }

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={registerModalVisible}
      onClose={closeRegisterHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          S'inscrire sur la plateforme
        </Text>
      </Modal.Header>
      <RegisterForm closeHandler={closeRegisterHandler} />
    </Modal>
  );
}

export default Register;
