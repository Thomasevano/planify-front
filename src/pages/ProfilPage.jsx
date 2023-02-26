import React from "react";
import { useCurrentUser } from "../CurrentUserContext";

export default function ProfilPage() {
  const { currentUser } = useCurrentUser();

  return (
    <div>
      <h1>Bienvenue {currentUser && currentUser.firstName + ' ' + currentUser.lastName } !</h1>
    </div>
  );
}