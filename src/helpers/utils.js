import { toast } from 'react-toastify';

export function formatTime(timeSlot) {
  const time = new Date(timeSlot)
  const hours = time.getHours();
  let minutes = time.getMinutes();

  if (minutes === 0) {
    minutes = '00';
  }

  return `${hours}:${minutes}`;
}

export function notify(response) {
  toast(response.Message,
    { type: response.HttpCode === 200 ? "success" : "error", theme: "colored" },
  );
}