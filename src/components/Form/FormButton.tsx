import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { FormButtonProps } from "src/types/FormButton";

const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
  return (
    <Stack pb={"3rem"}>
      <Button
        loadingText="Submitting"
        fontSize={"0.875rem"}
        type="submit"
        bg={"primary"}
        color={"black"}
        _hover={{
          bg: "blue.500",
        }}
        {...props}
      >
        {children}
      </Button>
    </Stack>
  );
};

export default FormButton;
