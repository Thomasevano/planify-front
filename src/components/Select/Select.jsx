import './select.css'
import { formatTime } from '../../helpers/utils';

export default function Select({ items, selectedTimeSlot = 'default', setSelectedTimeSlot, format = true, label = "Choisissez un créneau horaire", style = null}) {

  function handleChange(event) {
    setSelectedTimeSlot(event.target.value);
  }

  return (
    <>
      {items.length > 0 ?
        <>
          <p style={{display: "block"}}>{ label }</p>
          <select value={selectedTimeSlot} onChange={handleChange} style={style}>
          <option value="default" disabled>Selectionnez un créneau</option>
            {items.map((item) => (
              <option
                key={item}
                value={item}
              >
                {
                    format ? formatTime(item) : item
                }
              </option>
            ))}
          </select>
        </>
        : <p>Aucun créneau horaire disponible</p>}
    </>
  )
}
