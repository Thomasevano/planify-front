import axios from "axios";

class AuthService {
  login(user) {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/`, user)
      .then(response => {
        if (response.data.Token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, user); 
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();