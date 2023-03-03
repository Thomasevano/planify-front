import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Modal, Container, Card, Row, Text } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from '../../services/auth.service';
import ErrorMessage from '../ErrorMessage';
import { Password } from '../icons/Password';
import InputForm from "./InputForm";
import { notify } from '../../helpers/utils';

const schema = yup.object().shape({
  Email: yup.string().email("l'adresse email n'est pas valide"),
  Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function LoginForm({ closeHandler }) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
    resolver: yupResolver(schema),
  });

  const [failedLogin, setFailedLogin] = useState(false);

  const onSubmit = data => {
    authService.login(data)
      .then((response) => {
        console.log('reponse', response);
        if (response.HttpCode === 200) {
          setFailedLogin(false);
          closeHandler();
          notify(response.HttpCode, 'Vous êtes connecté !')
          window.location.reload();
        } else {
          setFailedLogin(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body>
        <Controller
          name="Email"
          control={control}
          render={({ field }) => <InputForm field={field} name="Email" label="Email" errors={errors} />}
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
        {failedLogin &&
          <Container>
            <Card css={{ $$cardColor: '$colors$error' }}>
              <Card.Body>
                <Row justify="center" align="center">
                  <Text h6 size={15} color="white" css={{ m: 0 }}>
                    Identifiants incorrects !
                  </Text>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        }
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