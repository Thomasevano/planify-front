import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import React from 'react';
import { DayPicker, Row } from 'react-day-picker';
import { differenceInCalendarDays, format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import Select from "./Select";
import { formatTime } from "../utils/time";

function BookingModal({ visible, setVisible, shopId }) {
  const [shopInfos, setshopInfos] = useState({});
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [customerName, setCustomerName] = useState();

  const date = format(selectedDay, 'yyyy-MM-dd')
  const selectedDayIsToday = isToday(selectedDay);

  const footer = <p>{format(selectedDay, 'PPPP', { locale: fr, weekStartsOn: 1 })}.</p>
  const selectedDayAvailabilities = shopInfos.Availabilities?.find(({ DayOfWeek }) => DayOfWeek === selectedDay.toLocaleString('default', { weekday: 'long' }).toLowerCase())

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const daysOfWeekWithoutAvailabilities = daysOfWeek.filter(day => !shopInfos.Availabilities?.some(availability => (availability.DayOfWeek === day)));
  const indexOfDayOfWeekWithoutAvailabilities = daysOfWeekWithoutAvailabilities.map(day => daysOfWeek.indexOf(day));
  const disabledDays = { dayOfWeek: indexOfDayOfWeekWithoutAvailabilities };

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
  }

  function filterTimeSlots(timeSlots) {
    const timeSlotsWithoutAppointments = filterAppointmentsTimeSlots(timeSlots);
    return filterPastTimeSlots(timeSlotsWithoutAppointments);
  }

  function filterAppointmentsTimeSlots(timeSlots) {
    return timeSlots.filter((timeSlot) => {
      return !shopInfos.Appointments.some((appointment) => {
        return appointment.AppointmentDateTime === `${date} ${formatTime(timeSlot)}:00`;
      })
    })
  }

  function filterPastTimeSlots(timeSlots) {
    if (selectedDayIsToday) {
      return timeSlots.filter((timeSlot) => {
        const timeSlotHours = parseInt(formatTime(timeSlot).split(':')[0]);
        const timeSlotMinutes = parseInt(formatTime(timeSlot).split(':')[1]);

        const todayHours = today.getHours();
        const todayMinutes = today.getMinutes();

        return timeSlotHours > todayHours || (timeSlotHours === todayHours && timeSlotMinutes >= todayMinutes);
      });
    }
    return timeSlots;
  }

  function submitAppointment() {
    const appointment = {
      customer_name: customerName,
      appointment_date: date,
      appointment_time: `${formatTime(selectedTimeSlot)}:00`,
      shop_id: shopId,
    };

    postData(`${import.meta.env.VITE_API_URL}/appointments/`, appointment)
      .then(response => {
        if (!response.HttpCode === 200) {
          throw new Error(response.Message);
        }
        return response.Message;
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

    closeHandler();
  }

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
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
            Prendre rendez-vous
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Text>Choisissez une date</Text>
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
          {selectedDayAvailabilities &&
            <Select items={filterTimeSlots(selectedDayAvailabilities.TimeSlots)} selectedTimeSlot={selectedTimeSlot} setSelectedTimeSlot={setSelectedTimeSlot} />
          }
          <Text>Entrez votre Nom</Text>
          <Input css={{marginTop: "20px"}} underlined labelPlaceholder="Nom" onChange={(e) => setCustomerName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fermer
          </Button>
          <Button auto onPress={submitAppointment}>
            Confirmer la réservation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingModal;
