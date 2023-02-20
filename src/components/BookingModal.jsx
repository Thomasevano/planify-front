import { Modal, Button, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import React from 'react';
import { DayPicker, Row } from 'react-day-picker';
import { differenceInCalendarDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TimeSlots from "./TimeSlots";

function BookingModal({ visible, setVisible, shopId }) {
  const [shopInfos, setshopInfos] = useState({});
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = <p>{format(selectedDay, 'PPPP', {locale:fr, weekStartsOn:1})}.</p>
  const selectedDayAvailabilities = shopInfos.Availabilities?.find(({ DayOfWeek }) => DayOfWeek === selectedDay.toLocaleString('default', {weekday: 'long'}).toLowerCase())    
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shops/${shopId}`)
      .then(response => response.json())
      .then(json => setshopInfos(json))
  }, [visible])

  function isPastDate(date) {
    return differenceInCalendarDays(date, today) < 0;
  }

  function OnlyFutureRow(props) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

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
          />
        <TimeSlots selectedDayAvailabilities={selectedDayAvailabilities} />
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
