import React from "react";
import { Text, Modal } from "@nextui-org/react";
import CabinetForm from "../Forms/CabinetForm";

function CreateCabinetModal({ createCabinetModalVisible, setCreateCabinetModalVisible }) {
    const closeCabinetHandler = () => {
        setCreateCabinetModalVisible(false);
    }

    return (
        <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={createCabinetModalVisible}
            onClose={closeCabinetHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Créer mon cabinet
                </Text>
            </Modal.Header>
            <CabinetForm closeHandler={closeCabinetHandler} />
        </Modal>
    );
}

export default CreateCabinetModal;
