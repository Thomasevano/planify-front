import React, {useEffect, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import {Button, Modal, Container, Card, Row, Text, Checkbox, Grid} from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/auth.service";
import ErrorMessage from "../ErrorMessage";
import InputForm from "./InputForm";
import { notify } from "../../helpers/utils";
import TextForm from "./TextForm.jsx";
import Select from "../Select/Select.jsx";
import axios from "axios";

const schema = yup.object().shape({
    ShopName: yup.string().min(3, 'Le nom du cabinet doit contenir au moins 3 caractères').max(64, 'Le nom du cabinet doit contenir au plus 64 caractères'),
    Description: yup.string().min(3, 'La description doit contenir au moins 3 caractèrtes').max(255, 'La description doit contenir au plus 255 caractères'),
    Address: yup.string().min(10, 'L\'adresse doit contenir au moins 10 caractères').max(255, 'L\'adresse doit contenir au plus 255 caractères'),
    PhoneNumber: yup.number(),
}).required();

function CabinetForm({ closeHandler }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ShopName: '',
            Description: '',
            Address: '',
            PhoneNumber: '',
            Availabilities: 'customer',
        },
        resolver: yupResolver(schema),
    });

    const [failedCreateCabinet, setFailedCreateCabinet] = useState(false);
    const [failedCreateCabinetMessage, setFailedCreateCabinetMessage] = useState('');

    const [availabilities, setAvailabilities] = useState([]);
    const [timeAvailabilities, setTimeAvailabilities] = useState({monday: {start: '', end: ''}, tuesday: {start: '', end: ''}, wednesday: {start: '', end: ''}, thursday: {start: '', end: ''}, friday: {start: '', end: ''}, saturday: {start: '', end: ''}, sunday: {start: '', end: ''}});
    const [refresher, setRefresher] = useState(0);

    const listDays = [
        {value: 'monday', label: 'Lundi'},
        {value: 'tuesday', label: 'Mardi'},
        {value: 'wednesday', label: 'Mercredi'},
        {value: 'thursday', label: 'Jeudi'},
        {value: 'friday', label: 'Vendredi'},
        {value: 'saturday', label: 'Samedi'},
        {value: 'sunday', label: 'Dimanche'},
    ];

    const listTimeSlots = [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
    ]

    const changeTimeAvailability = (day, start, end) => {
        timeAvailabilities[day] = { start: start, end: end };
    }

    const onCreateCabinetSubmit = data => {
        axios.post(`${import.meta.env.VITE_API_URL}/shops`, data)
            .then((response) => {
                console.log(response);
                if (response.data.HttpCode === 200) {
                    closeHandler();
                    notify(response.data.HttpCode, 'Le cabinet a bien été crée.')
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
                    render={({ field }) => <TextForm field={field} name="Description" label="Description" errors={errors} />}
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

                <Checkbox.Group
                    color="primary"
                    label="Jours et Horaires d'ouverture"
                    value={availabilities}
                    onChange={setAvailabilities}>
                    { listDays.map((day) => (
                        <div>
                            <Checkbox size='sm' key={day.value} value={day.value}>{day.label}</Checkbox>
                            {availabilities.includes(day.value) &&
                                (
                                    <Grid.Container gap={2} justify="center">
                                        <Grid xs={6} direction={"column"}>
                                            <Select
                                                items={listTimeSlots}
                                                format={false}
                                                selectedTimeSlot={timeAvailabilities[day.value].start}
                                                setSelectedTimeSlot={(timeValue) => changeTimeAvailability(day.value, timeValue, timeAvailabilities[day.value].end)}
                                                label={"Heure d'ouverture"}
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                        <Grid xs={6} direction={"column"}>
                                            <Select
                                                items={listTimeSlots}
                                                format={false}
                                                selectedTimeSlot={timeAvailabilities[day.value].end}
                                                setSelectedTimeSlot={(timeValue) => changeTimeAvailability(day.value, timeAvailabilities[day.value].start, timeValue)}
                                                label={"Heure de fermeture"}
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                    </Grid.Container>
                                )}
                        </div>
                    ))}
                </Checkbox.Group>

            </Modal.Body>
            <Modal.Footer>
                {failedCreateCabinet &&
                    <Container>
                        <Card css={{ $$cardColor: '$colors$error' }}>
                            <Card.Body>
                                <Row justify="center" align="center">
                                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                                        {failedCreateCabinetMessage}
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
                    Valider
                </Button>
            </Modal.Footer>
        </form>
    );
}

export default CabinetForm