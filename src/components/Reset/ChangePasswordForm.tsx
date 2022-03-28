import {
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import InputWithValidator from "../Form/InputWithValidator";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import FormButton from "../Form/FormButton";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import {
  GENERATE_PASSWORD_RESET_LINK,
  RESET_PASSWORD,
} from "src/graphql/auth/mutations/passwordReset";
import {
  resetPasswordVariables,
  resetPassword,
  resetPassword_resetPassword,
} from "src/types/auth/resetPassword";
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordInput> = async (data) => {
    try {
      const { data: reset } = await resetPassword({
        variables: {
          passwordResetCode: router.query.code,

          newPassword: data.confirmPassword,
        },
      });

      if (reset?.resetPassword.token) {
        await signIn("credentials", {
          email: router.query.email,
          password: data.confirmPassword,
          callbackUrl: "/homepage",
        });
      }
    } catch (error) {
      console.log(error);
    }
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

        <FormButton>Reset Password</FormButton>

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
