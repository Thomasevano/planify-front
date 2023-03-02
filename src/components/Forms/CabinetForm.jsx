import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Radio, Button, Modal, Container, Card, Row, Text } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/auth.service";
import ErrorMessage from "../ErrorMessage";
import InputForm from "./InputForm";
import { Password } from "../icons/Password";
import { notify } from "../../helpers/utils";

const schema = yup.object().shape({
    FirstName: yup.string().min(3, 'Le prénom doit contenir au moins 3 caractères').max(32, 'Le prénom doit contenir au plus 32 caractères'),
    LastName: yup.string().min(3, 'Le nom de famille doit contenir au moins 3 caractères').max(32, 'Le nom de famille doit contenir au plus 32 caractères'),
    Email: yup.string().email("l'adresse email n'est pas valide"),
    Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function CabinetForm({ closeHandler }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ShopName: '',
            Description: '',
            Address: '',
            PhoneNumber: '',
            Role: 'customer',
        },
        resolver: yupResolver(schema),
    });

    const [failedCreateCabinet, setFailedCreateCabinet] = useState(false);
    const [failedCreateCabinetMessage, setFailedCreateCabinetMessage] = useState('');

    const onCreateCabinetSubmit = data => {
        authService.register(data)
            .then((response) => {
                console.log(response);
                if (response.data.HttpCode === 200) {
                    closeHandler();
                    notify(response.data.HttpCode, 'Votre compte a bien été crée, vous pouvez vous connecter')
                } else {
                    setFailedCreateCabinetMessage(response.data.Message);
                    setFailedCreateCabinet(true);
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <form onSubmit={handleSubmit(onCreateCabinetSubmit)}>
            <Modal.Body>
                <Controller
                    name="ShopName"
                    control={control}
                    render={({ field }) => <InputForm field={field} name="ShopName" label="Nom du cabinet" errors={errors} />}
                />
                <ErrorMessage message={errors.ShopName?.message} />

                <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => <InputForm field={field} name="Description" label="Description" errors={errors} />}
                />
                <ErrorMessage message={errors.Description?.message} />

                <Controller
                    name="Address"
                    control={control}
                    render={({ field }) => <InputForm field={field} name="Address" label="Adresse complète" errors={errors} />}
                />
                <ErrorMessage message={errors.Address?.message} />

                <Controller
                    name="PhoneNumber"
                    control={control}
                    render={({ field }) => <InputForm field={field} name="PhoneNumber" label="Téléphone" errors={errors} />}
                />
                <ErrorMessage message={errors.PhoneNumber?.message} />

                <Controller
                    name="Role"
                    control={control}
                    defaultValue="retailer"
                    render={({ field }) => (
                        <Radio.Group {...field} label="Role">
                            <Radio value="customer" size="sm">Client</Radio>
                            <Radio value="retailer" size="sm">Commerçant</Radio>
                        </Radio.Group>
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
                {failedRegister &&
                    <Container>
                        <Card css={{ $$cardColor: '$colors$error' }}>
                            <Card.Body>
                                <Row justify="center" align="center">
                                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                                        {failedRegisterMessage}
                                    </Text>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                }
                <Button auto flat color="error" onPress={closeHandler}>
                    Fermer
                </Button>
                <Button auto type="submit">
                    S'inscrire
                </Button>
            </Modal.Footer>
        </form>
    );
}

export default CabinetForm