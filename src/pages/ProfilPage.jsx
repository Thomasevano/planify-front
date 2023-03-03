import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../CurrentUserContext";
import { Container, Text } from "@nextui-org/react";
import { getData } from "../helpers/requestData";
import authService from "../services/auth.service";
import { Table } from "@nextui-org/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProfilPage() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useCurrentUser();
  const userToken = authService.getToken();

  useEffect(() => {
    async function fetchData() {
      return await getData(`${import.meta.env.VITE_API_URL}/users/appointments/${currentUser.id}`, userToken)
        .then(json => setAppointments(json))
    }

    fetchData();
  }, []);

  const appointementColumns = [
    {
      key: 'appointment_date',
      label: 'Date',
    },
    {
      key: 'appointment_time',
      label: 'Heure',
    },
    {
      key: 'shop_name',
      label: 'Praticien',
    },
  ]


  return (
    <Container>
      <Text h1 align="center" css={{ margin: "1.25rem 0" }}>Bienvenue {currentUser && currentUser.firstName + ' ' + currentUser.lastName} !</Text>

      {appointments.length > 0
        ?
        <>
          <Text h3 align="center">Voici les rendez vous que vous avez pris</Text>
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header columns={appointementColumns}>
              {(appointementColumn) => (
                <Table.Column key={appointementColumn.key}>{appointementColumn.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={appointments}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnKey) => <Table.Cell>{columnKey === 'appointment_date' ? format(new Date(item[columnKey]), 'PPPP', { locale: fr, weekStartsOn: 1 }) : item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </>
        : <Text h2 align="center">Vous n'avez pas de rendez vous</Text>
      }
    </Container>
  );
}