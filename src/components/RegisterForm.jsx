import { useForm, Controller } from "react-hook-form";
import { Input, Radio } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../services/auth.service";
import ErrorMessage from "../utils/ErrorMessage";

const schema = yup.object().shape({
  FirstName: yup.string().min(3, 'Le prénom doit contenir au moins 3 caractères').max(32, 'Le prénom doit contenir au plus 32 caractères'),
  LastName: yup.string().min(3, 'Le nom de famille doit contenir au moins 3 caractères').max(32, 'Le nom de famille doit contenir au plus 32 caractères'),
  Email: yup.string().email("l'adresse email n'est pas valide"),
  Password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'),
}).required();

function RegisterForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    // authService.register(data.FirstName, data.LastName, data.Email, data.Password, data.Role)
    //   .then(() => {
    //     response => {
    //       console.log(response.data);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    console.log('data', data);
  };
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="FirstName"
        control={control}
        render={({ field }) => <Input required helperText="Requis" labelPlaceholder="Prénom" status={errors.FirstName ? 'error' : 'default'} {...field} />}
      />
      <ErrorMessage message={errors.FirstName?.message} />
      <Controller
        name="LastName"
        control={control}
        render={({ field }) => <Input required helperText="Requis" labelPlaceholder="Nom de Famille" status={errors.LastName ? 'error' : 'default'} {...field} />}
        />
        <ErrorMessage message={errors.LastName?.message} />
      <Controller
        name="Email"
        control={control}
        render={({ field }) => <Input required helperText="Requis" labelPlaceholder="Email" status={errors.Email ? 'error' : 'default'} {...field} />}
        />
        <ErrorMessage message={errors.Email?.message} />
      <Controller
        name="Password"
        control={control}
        render={({ field }) => <Input.Password required helperText="Requis" labelPlaceholder="Mot de passe" status={errors.Password ? 'error' : 'default'} {...field} />}
        />
        <ErrorMessage message={errors.Password?.message} />
      <Controller
        name="Role"
        control={control}
        defaultValue="retailer"
        render={({ field }) => (
          <Radio.Group {...field}>
            <Radio value="retailer">Commerçant</Radio>
            <Radio value="customer">Client</Radio>
          </Radio.Group>
        )}
      />
      <input type="submit" />
    </form>
  );
}

export default RegisterForm