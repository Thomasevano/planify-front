import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Radio, Button, Modal } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/auth.service";
import ErrorMessage from "../ErrorMessage";
import InputForm from "./InputForm";
import { Password } from "../icons/Password";

const schema = yup.object().shape({
  FirstName: yup.string().min(3, 'Le prénom doit contenir au moins 3 caractères').max(32, 'Le prénom doit contenir au plus 32 caractères'),
  LastName: yup.string().min(3, 'Le nom de famille doit contenir au moins 3 caractères').max(32, 'Le nom de famille doit contenir au plus 32 caractères'),
  Email: yup.string().email("l'adresse email n'est pas valide"),
  Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function RegisterForm({ closeHandler }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      Role: 'customer',
    },
    resolver: yupResolver(schema),
  });

  const onRegisterSubmit = data => {
    console.log('data', data);
    console.log(errors)
    // authService.register(data)
    //   .then(() => {
    //     response => {
    //       console.log(response.data);
    //     }
    //     closeHandler();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  };

  return (
    <form onSubmit={handleSubmit(onRegisterSubmit)}>
      <Modal.Body>
        <Controller
          name="FirstName"
          control={control}
          render={({ field }) => <InputForm field={field} name="FirstName" label="Prénom" errors={errors}/>}
        />
        <ErrorMessage message={errors.FirstName?.message} />
        <Controller
          name="LastName"
          control={control}
          render={({ field }) => <InputForm field={field} name="LastName" label="Nom de Famille" errors={errors}/>}
        />
        <ErrorMessage message={errors.LastName?.message} />
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
            <Input.Password {...field}
              required
              clearable
              bordered
              fullWidth
              color='primary'
              size='lg'
              helperText="Requis"
              label="Password"
              placeholder="Mot de passe"
              status={errors.Password ? 'error' : 'default'}
              contentLeft={<Password fill="currentColor" />}
            />
          }
        />
        <ErrorMessage message={errors.Password?.message} />
        <Controller
          name="Role"
          control={control}
          defaultValue="retailer"
          render={({ field }) => (
            <Radio.Group {...field} label="Role">
              <Radio value="customer" size="sm">Client</Radio>
              <Radio value="retailer" size="sm">Commerçant</Radio>
            </Radio.Group>
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Fermer
        </Button>
        <Button auto type="submit">
          S'inscrire
        </Button>
      </Modal.Footer>
    </form>
  );
}

export default RegisterForm