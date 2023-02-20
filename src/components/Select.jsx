import { useState } from 'react'
import './select.css'

export default function Select({ items }) {
  const [selected, setSelected] = useState(items[0])
  console.log(items)

  return (
    <select>
      {items.map((item) => (
        <option
          key={item}
          value={item}
        >
          {item}
        </option>
      ))}
    </select>
  )
}
