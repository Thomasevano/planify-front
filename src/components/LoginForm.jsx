import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthService from '../services/auth.service';
import { withRouter } from '../common/with-router';
import ErrorMessage from '../utils/ErrorMessage';

const schema = yup.object().shape({
  Email: yup.string().email("l'adresse email n'est pas valide"),
  Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function LoginForm(props) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    // authService.login(data.Email, data.Password)
    //   .then(() => {
    //     props.router.navigate('/profile');
    //     window.location.reload();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    console.log(data);
  };

  function clearForm() {
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="Email"
        control={control}
        render={({ field }) => <Input labelPlaceholder="Email" {...field} />}
      />
      <ErrorMessage message={errors.Email?.message} />
      <Controller
        name="Password"
        control={control}
        render={({ field }) => <Input.Password labelPlaceholder="Mot de passe" {...field} />}
      />
      <ErrorMessage message={errors.Password?.message} />
      <input type="submit" />
    </form>
  );
}

export default withRouter(LoginForm);