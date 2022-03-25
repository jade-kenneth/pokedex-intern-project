import { InputProps } from "@chakra-ui/react";
import { HTMLAttributes } from "react";
import { FieldError, UseFormRegister, ValidationRule } from "react-hook-form";

export interface InputWithValidatorProps extends InputProps {
  errorMessage?: string | undefined;
  check: FieldError | undefined;
  type: React.HTMLInputTypeAttribute;
}
