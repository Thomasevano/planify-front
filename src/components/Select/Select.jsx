import './select.css'
import { formatTime } from '../../helpers/utils';

export default function Select({ items, selectedTimeSlot = 'default', setSelectedTimeSlot }) {

  function handleChange(event) {
    setSelectedTimeSlot(event.target.value);
  }

  return (
    <>
      {items.length > 0 ?
        <>
          <p>Choisissez un créneau horaire</p>
          <select value={selectedTimeSlot} onChange={handleChange}>
          <option value="default" disabled>Selectionnez un créneau</option>
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
