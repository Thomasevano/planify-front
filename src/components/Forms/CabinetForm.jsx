import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Card, Checkbox, Container, Grid, Modal, Row, Text} from "@nextui-org/react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/auth.service";
import ErrorMessage from "../ErrorMessage";
import InputForm from "./InputForm";
import {daysOfWeek, notify} from "../../helpers/utils";
import TextForm from "./TextForm.jsx";
import Select from "../Select/Select.jsx";
import {useCurrentUser} from "../../CurrentUserContext.jsx";
import {postData} from "../../helpers/requestData.js";

const schema = yup.object().shape({
    ShopName: yup.string().min(3, 'Le nom du cabinet doit contenir au moins 3 caractères').max(64, 'Le nom du cabinet doit contenir au plus 64 caractères'),
    Description: yup.string().min(3, 'La description doit contenir au moins 3 caractèrtes').max(255, 'La description doit contenir au plus 255 caractères'),
    Address: yup.string().min(10, 'L\'adresse doit contenir au moins 10 caractères').max(255, 'L\'adresse doit contenir au plus 255 caractères'),
    PhoneNumber: yup.string(),
}).required();

function CabinetForm({ closeHandler }) {
    const [availabilities, setAvailabilities] = useState([]);
    const [timeAvailabilities, setTimeAvailabilities] = useState(daysOfWeek.map(day => ({ DayOfWeek: day, StartTime: '00:00', EndTime: '00:00', Duration: 15 })));

    const { currentUser } = useCurrentUser();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ShopName: '',
            Description: '',
            Address: '',
            PhoneNumber: '',
            UserId: currentUser.id,
            Availabilities: timeAvailabilities,
        },
        resolver: yupResolver(schema),
    });

    const [failedCreateCabinet, setFailedCreateCabinet] = useState(false);
    const [failedCreateCabinetMessage, setFailedCreateCabinetMessage] = useState('');


    const userToken = authService.getToken();

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

    const findAvailibility = (day, returnValue = false) => {
        for (const [key, value] of Object.entries(timeAvailabilities)) {
            if (value.DayOfWeek === day) {
                if (returnValue) {
                    return value;
                } else {
                    return key;
                }
            }
        }
    }

    const changeTimeAvailability = (day, start, end) => {
        const availability = findAvailibility(day);
        var filtered = timeAvailabilities.filter(function(el) { return el.DayOfWeek != day; });
        filtered.push({ DayOfWeek: day, StartTime: start, EndTime: end, Duration: '15' });
        setTimeAvailabilities(filtered);
        console.log(timeAvailabilities);
    }

    const onCreateCabinetSubmit = async data => {
        data['Availabilities'] = timeAvailabilities;
        console.log(data);

        await postData(`${import.meta.env.VITE_API_URL}/shops`, data, userToken)
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
                        <div key={day.value}>
                            <Checkbox size='sm' key={day.value} value={day.value}>{day.label}</Checkbox>
                            {availabilities.includes(day.value) &&
                                (
                                    <Grid.Container gap={2} justify="center">
                                        <Grid xs={6} direction={"column"}>
                                            <Select
                                                items={listTimeSlots}
                                                format={false}
                                                selectedTimeSlot={findAvailibility(day.value, true)?.StartTime}
                                                setSelectedTimeSlot={(timeValue) => changeTimeAvailability(day.value, timeValue, findAvailibility(day.value, true)?.EndTime)}
                                                label={"Heure d'ouverture"}
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                        <Grid xs={6} direction={"column"}>
                                            <Select
                                                items={listTimeSlots}
                                                format={false}
                                                selectedTimeSlot={findAvailibility(day.value, true)?.EndTime}
                                                setSelectedTimeSlot={(timeValue) => changeTimeAvailability(day.value, findAvailibility(day.value, true)?.StartTime, timeValue)}
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