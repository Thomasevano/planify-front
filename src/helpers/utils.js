import { toast } from 'react-toastify';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

export function formatTime(timeSlot) {
  const time = new Date(timeSlot)
  const hours = time.getHours();
  let minutes = time.getMinutes();

  if (minutes === 0) {
    minutes = '00';
  }

  return `${hours}:${minutes}`;
}

export function notify(httpCode, message) {
  toast(message,
    { type: httpCode === 200 ? "success" : "error", theme: "colored" },
  );
}

export const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const footerFormatedDate = (date) => format(date, 'PPPP', { locale: fr, weekStartsOn: 1 })

export const today = new Date();
