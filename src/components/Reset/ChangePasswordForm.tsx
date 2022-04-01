import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputWithValidator from "../Form/InputWithValidator";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import FormButton from "../Form/FormButton";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { RESET_PASSWORD } from "src/graphql/auth/mutations/passwordReset";
import { resetPassword } from "src/types/auth/resetPassword";
import { signIn } from "next-auth/react";
import { ChangePasswordInput } from "src/interfaces/Input";
let schema = yup.object().shape({
  password: yup
    .string()
    .min(5, "Password atleast 5 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()

    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const ChangePasswordForm = () => {
  const [resetPassword, {}] = useMutation<resetPassword>(RESET_PASSWORD);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<ChangePasswordInput> = async (data) => {
    setLoading(true);
    try {
      const { data: reset } = await resetPassword({
        variables: {
          passwordResetCode: router.query.code,

          newPassword: data.confirmPassword,
        },
      });

      if (reset?.resetPassword.token) {
        const response = await signIn<"credentials">("credentials", {
          email: router.query.email,
          password: data.confirmPassword,
          redirect: false,
        });

        if (response?.error) {
          toast({
            position: "top",

            render: () => (
              <Box borderRadius={"10px"} color="white" p={3} bg="red">
                {`🧐 ${response.error}`}
              </Box>
            ),
          });
        } else {
          toast({
            position: "top",

            render: () => (
              <Box borderRadius={"10px"} color="white" p={3} bg="green">
                {`Successfully resets password!`}
              </Box>
            ),
          });
        }
      }
    } catch (error: any) {
      toast({
        position: "top",

        render: () => (
          <Box borderRadius={"10px"} color="white" p={3} bg="red">
            {`🧐 ${error.message} or code expired`}
          </Box>
        ),
      });
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={router.query.email} disabled={true} />
        </FormControl>
        <InputWithValidator
          check={errors.password}
          errorMessage={errors.password?.message}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        >
          New Password
        </InputWithValidator>
        <InputWithValidator
          check={errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", { required: true })}
        >
          Confirm new password
        </InputWithValidator>

        <FormButton isLoading={loading} loadingText="Resetting password...">
          Reset Password
        </FormButton>

        <Stack>
          <Text align={"center"}>
            Remember your password?{" "}
            <Link color={"primary"} onClick={() => router.push("/signin")}>
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
