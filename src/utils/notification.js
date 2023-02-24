import { toast } from 'react-toastify';

export function notify(response) {
  toast(response.Message,
    { type: response.HttpCode === 200 ? "success" : "error", theme: "colored" },
  );
}