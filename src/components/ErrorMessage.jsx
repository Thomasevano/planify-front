import React from "react";
import { Text } from "@nextui-org/react";

function ErrorMessage({ message }) {
  return (
    <Text color="error" size="small" css={{ marginTop: "$8" }} >
      {message}
    </Text>
  );
}

export default ErrorMessage;