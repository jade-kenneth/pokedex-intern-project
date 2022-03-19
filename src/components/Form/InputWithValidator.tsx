import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { InputWithValidatorProps } from "src/types/InputWithValidator";

const InputWithValidator: React.FC<InputWithValidatorProps> = ({
  required,
  errorMessage,
  check,
  type,
  placeholder,
  register,
  children,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={!!check}>
      <FormLabel>{children}</FormLabel>
      {id === "password" ? (
        <InputGroup>
          <Input
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            {...props}
            {...register(id, { required: required })}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          placeholder={placeholder}
          {...register(id, { required: required })}
          {...props}
        />
      )}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default InputWithValidator;
