import React, { useEffect, useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { format, differenceInCalendarDays } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker, Row } from "react-day-picker";
import { getData } from "../../helpers/requestData";
import { footerFormatedDate, daysOfWeek, today } from "../../helpers/utils";

function RetailerModal({ visible, setVisible, selectedShopId, setSelectedShopId }) {
  const [shopInfos, setShopInfos] = useState({});
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = <p>{footerFormatedDate(selectedDay)}.</p>

  const selectedDayAppointments = shopInfos.Appointments?.filter(({ appointment_date }) => appointment_date === format(selectedDay, 'yyyy-MM-dd'))
  const daysOfWeekWithoutAvailabilities = daysOfWeek.filter(day => !shopInfos.Availabilities?.some(availability => (availability.DayOfWeek === day)));
  const indexOfDayOfWeekWithoutAvailabilities = daysOfWeekWithoutAvailabilities.map(day => daysOfWeek.indexOf(day));
  const disabledDays = { dayOfWeek: indexOfDayOfWeekWithoutAvailabilities };

  useEffect(() => {
    if (!selectedShopId) return;
    getData(`${import.meta.env.VITE_API_URL}/shops/${selectedShopId}`)
      .then(json => setShopInfos(json))
  }, [selectedShopId]);

  function isPastDate(date) {
    return differenceInCalendarDays(date, today) < 0;
  }

  function OnlyFutureRow(props) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

  const closeHandler = () => {
    setSelectedShopId(null);
    setSelectedDay(today);
    setVisible(false);
  }

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
            Choisisez une date afin de voir les rendez-vous du jour
          </Text>
        </Modal.Header>
        <Modal.Body>
          <DayPicker
            fromDate={today}
            components={{ Row: OnlyFutureRow }}
            hidden={isPastDate}
            showOutsideDays
            mode="single"
            required
            selected={selectedDay}
            onSelect={setSelectedDay}
            footer={footer}
            locale={fr}
            weekStartsOn={1}
            disabled={disabledDays}
          />
          <div>
            {selectedDayAppointments?.length > 0 ?
              <>
                <Text align="center">Voici les rendez-vous du jour.</Text>
                <ul>
                  {selectedDayAppointments.map(({ id, appointment_time, customer_name }) => (
                    <li key={id}>
                      <Text>{appointment_time} - {customer_name}</Text>
                    </li>
                  ))}
                </ul>
              </>
              :
              <Text align="center">Aucun rendez-vous n'est prévu aujourd'hui.</Text>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RetailerModal;