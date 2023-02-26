import React, { createContext, useContext, useState } from "react";
import authService from "./services/auth.service";

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function fetchCurrentUser() {
    const user = await authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser, logoutUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
