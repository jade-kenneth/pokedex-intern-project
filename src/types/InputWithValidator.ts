import { InputProps } from "@chakra-ui/react";
import { HTMLAttributes } from "react";
import { FieldError, UseFormRegister, ValidationRule } from "react-hook-form";
import { SigninInputs, SignupInputs } from "./Input";
export interface InputWithValidatorProps extends InputProps {
  required: ValidationRule<boolean>;
  register: UseFormRegister<SigninInputs> | UseFormRegister<SignupInputs>;
  placeholder?: string;
  errorMessage?: string | undefined;
  check: FieldError | undefined;
  type: "email" | "password" | "text";
  id: string;
}
