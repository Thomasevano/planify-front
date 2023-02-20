import { parseISO, getHours, getMinutes } from 'date-fns';
import Select from './Select';

function TimeSlots({ selectedDayAvailabilities, selectedTimeSlot, setSelectedTimeSlot }) {

  function parseTimeSlot(timeSlot) {
    const regex = /T(\d{2}):(\d{2}):(\d{2})Z/;
    const match = regex.exec(timeSlot);

    const hours = match[1];
    const minutes = match[2];

    return `${hours}h${minutes}`;
  }

  const dayTimeSlots = selectedDayAvailabilities?.TimeSlots.map((timeSlot) => parseTimeSlot(timeSlot));

  return (
    <div>
      {selectedDayAvailabilities ?
        <Select items={dayTimeSlots} selectedTimeSlot={selectedTimeSlot} setSelectedTimeSlot={setSelectedTimeSlot} />
        : <p>La boutique est fermé</p>
      }
    </div>
  );

}

export default TimeSlots;
