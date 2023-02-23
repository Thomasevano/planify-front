import './select.css'
import { formatTime } from '../utils/time';

export default function Select({ items, selectedTimeSlot, setSelectedTimeSlot }) {

  function handleChange(event) {
    setSelectedTimeSlot(event.target.value);
  }

  return (
    <>
      {items.length > 0 ?
        <>
          <p>Choisissez un créneau horaire</p>
          <select value={selectedTimeSlot} onChange={handleChange}>
            {items.map((item) => (
              <option
                key={item}
                value={item}
              >
                {formatTime(item)}
              </option>
            ))}
          </select>
        </>
        : <p>Aucun créneau horaire disponible</p>}
    </>
  )
}
