import axios from "axios";
import decodeUserJWT from "../helpers/decodeUserJWT";

class AuthService {
  login(user) {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/`, user)
      .then(response => {
        if (response.data.HttpCode === 200) {
          if (response.data.Token) {
            localStorage.setItem("user", JSON.stringify(response.data.Token));
          }
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

  async getCurrentUser() {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      const user = await decodeUserJWT(userToken);
      return user;
    }
  }

  getToken() {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (!userToken) return;
    return userToken;
  }
}

export default new AuthService();