import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import React from 'react';
import { DayPicker, Row } from 'react-day-picker';
import { differenceInCalendarDays, format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import Select from "../Select/Select";
import { formatTime, notify, footerFormatedDate, daysOfWeek, today } from '../../helpers/utils';
import { postData } from "../../helpers/requestData";
import { useCurrentUser } from "../../CurrentUserContext";

function BookingModal({ visible, setVisible, selectedShopId, setSelectedShopId }) {
  const [shopInfos, setShopInfos] = useState({});
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const { currentUser } = useCurrentUser();

  const date = format(selectedDay, 'yyyy-MM-dd')
  const selectedDayIsToday = isToday(selectedDay);

  const footer = <p>{footerFormatedDate}.</p>
  const selectedDayAvailabilities = shopInfos.Availabilities?.find(({ DayOfWeek }) => DayOfWeek === selectedDay.toLocaleString('default', { weekday: 'long' }).toLowerCase())

  const daysOfWeekWithoutAvailabilities = daysOfWeek.filter(day => !shopInfos.Availabilities?.some(availability => (availability.DayOfWeek === day)));
  const indexOfDayOfWeekWithoutAvailabilities = daysOfWeekWithoutAvailabilities.map(day => daysOfWeek.indexOf(day));
  const disabledDays = { dayOfWeek: indexOfDayOfWeekWithoutAvailabilities };

  useEffect(() => {
    if (!selectedShopId) return;
    fetch(`${import.meta.env.VITE_API_URL}/shops/${selectedShopId}`)
      .then(response => response.json())
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
    setSelectedTimeSlot();
    setCustomerName();
    setSelectedShopId(null);
    setSelectedDay(today);
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

  async function submitAppointment() {
    let userId
    let userEmail
    let username

    if (currentUser) {
      userId = currentUser.id
      userEmail = currentUser.email
      username = currentUser.firstName + ' ' + currentUser.lastName
    } else {
      userId = null
      userEmail = customerEmail
      username = customerName
    }

    const appointment = {
      customer_name: username,
      appointment_date: date,
      appointment_time: `${formatTime(selectedTimeSlot)}:00`,
      shop_id: selectedShopId,
      user_id: userId,
      user_email: userEmail
    };

    closeHandler();

    try {
      const response = await postData(`${import.meta.env.VITE_API_URL}/appointments/`, appointment)
      return notify(response.HttpCode, 'Votre rendez-vous a bien été pris');
    } catch (error) {
      console.error(error);
      return notify(error.HttpCode, 'Une erreur est survenue lors de la prise de rendez-vous');
    };
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
            Choisir une date et une heure de rendez-vous
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
          {!currentUser &&
            <>
              <Input css={{ marginTop: "20px" }} underlined labelPlaceholder="Entrez votre Nom" onChange={(e) => setCustomerName(e.target.value)} />
              <Input css={{ marginTop: "20px" }} underlined labelPlaceholder="Entrez votre Email" onChange={(e) => setCustomerEmail(e.target.value)} />
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Annuler
          </Button>
          <Button auto onPress={submitAppointment}>
            Je prends rendez-vous
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingModal;
