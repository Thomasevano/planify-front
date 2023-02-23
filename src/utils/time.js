export function formatTime(timeSlot) {
  const time = new Date(timeSlot)
  const hours = time.getHours();
  let minutes = time.getMinutes();

  if (minutes === 0) {
    minutes = '00';
  }

  return `${hours}:${minutes}`;
}