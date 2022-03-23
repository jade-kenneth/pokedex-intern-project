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

{
  /**Refactored: Using forwardRef to pass a ref through a component to one of its children */
  /*source https://stackoverflow.com/questions/68565378/use-react-hook-form-with-custom-textinput */
  /* */
}
const InputWithValidator = React.forwardRef<
  HTMLInputElement,
  InputWithValidatorProps
>(({ errorMessage, check, type, children, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={!!check}>
      <FormLabel>{children}</FormLabel>
      {type === "password" ? (
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            focusBorderColor={"primary"}
            ref={ref}
            {...props}
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
          autoComplete="off"
          focusBorderColor={"primary"}
          ref={ref}
          {...props}
        />
      )}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
});
InputWithValidator.displayName = "InputWithValidator";
export default InputWithValidator;
