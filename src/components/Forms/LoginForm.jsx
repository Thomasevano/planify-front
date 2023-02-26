import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Modal } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from '../../services/auth.service';
import ErrorMessage from '../ErrorMessage';
import { Password } from '../icons/Password';
import { useNavigate } from "react-router-dom";
import InputForm from "./InputForm";

const schema = yup.object().shape({
  Email: yup.string().email("l'adresse email n'est pas valide"),
  Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function LoginForm({ closeHandler }) {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
    resolver: yupResolver(schema),
  });
  
  const onSubmit = data => {
    authService.login(data)
      .then(() => {
        response => {
          console.log(response.data);
        }
        closeHandler();
        navigate('/profile');
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body>
        <Controller
          name="Email"
          control={control}
          render={({ field }) => <InputForm field={field} name="Email" label="Email" errors={errors}/>}
        />
        <ErrorMessage message={errors.Email?.message} />
        <Controller
          name="Password"
          control={control}
          render={({ field }) =>
            <Input.Password
              required
              clearable
              bordered
              fullWidth
              color='primary'
              size='lg'
              helperText="Requis"
              label="Mot de passe"
              placeholder="Mot de passe" {...field}
              status={errors.Password ? 'error' : 'default'}
              contentLeft={<Password fill="currentColor" />}
            />
          }
        />
        <ErrorMessage message={errors.Password?.message} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Fermer
        </Button>
        <Button auto type="submit">
          Se connecter
        </Button>
      </Modal.Footer>
    </form>
  );
}

export default LoginForm;