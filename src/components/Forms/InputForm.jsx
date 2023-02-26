import React from "react";
import { Input } from "@nextui-org/react";
import { Mail } from "../icons/Mail";
import { Password } from "../icons/Password";

function InputForm({ name, label, errors, field }) {
  return (
    <Input {...field}
      required
      clearable
      bordered
      fullWidth
      color='primary'
      size='lg'
      helperText="Requis"
      label={label}
      placeholder={label}
      status={errors[name] ? 'error' : 'default'}
      contentLeft={name === "Email" && <Mail fill="currentColor" />}
    />
  );
}

export default InputForm;