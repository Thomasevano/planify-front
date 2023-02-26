import React from "react";
import { Text, Modal } from "@nextui-org/react";
import LoginForm from "../Forms/LoginForm";

function LoginModal({ loginModalVisible, setLoginModalVisible }) {
  const closeLoginHandler = () => {
    setLoginModalVisible(false);
  }

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={loginModalVisible}
      onClose={closeLoginHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Se connecter sur la plateforme
        </Text>
      </Modal.Header>
      <LoginForm closeHandler={closeLoginHandler} />
    </Modal>
  );
}

export default LoginModal;
