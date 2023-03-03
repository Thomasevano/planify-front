import React from "react";
import {Input, Textarea} from "@nextui-org/react";
import { Mail } from "../icons/Mail";
import { Password } from "../icons/Password";

function TextForm({ name, label, errors, field }) {
    return (
        <Textarea {...field}
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
        />
    );
}

export default TextForm;