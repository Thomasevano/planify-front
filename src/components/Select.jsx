import './select.css'
import { formatTime } from '../utils/time';

export default function Select({ items, selectedTimeSlot, setSelectedTimeSlot }) {

  function handleChange(event) {
    setSelectedTimeSlot(event.target.value);
  }

  return (
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
  )
}
