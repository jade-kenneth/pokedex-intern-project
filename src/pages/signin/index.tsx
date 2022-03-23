import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Link, Stack, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { useEffect, useState } from "react";
import loginBg from "public/backgrounds/loginBg.png";
import { SigninInputs } from "src/types/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProps } from "src/types/Form";
import AccountLayout from "src/components/layout/account-layout/AccountLayout";

import InputWithValidator from "src/components/Form/InputWithValidator";
import FormButton from "src/components/Form/FormButton";
let schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
const SignIn = ({ provider }: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  console.log(router);
  const onSubmit: SubmitHandler<SigninInputs> = (data) => {
    signIn(provider?.credentials.id, {
      email: data.email,
      password: data.password,

      callbackUrl: "http://localhost:3000/homepage",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <InputWithValidator
          check={errors.email}
          errorMessage={errors.email?.message}
          type="email"
          placeholder="Enter email"
          {...register("email", { required: true })}
        >
          Email Address
        </InputWithValidator>

        <InputWithValidator
          check={errors.password}
          errorMessage={errors.password?.message}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        >
          Password
        </InputWithValidator>

        <FormButton>Sign in</FormButton>

        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"center"}
          justify={"center"}
          mb="8px"
        >
          <Link color={"primary"} onClick={() => router.push("reset")}>
            Forgot password?
          </Link>
        </Stack>
        <Stack>
          <Text align={"center"}>
            Don&apos;t have an account?{" "}
            <Link color={"primary"} onClick={() => router.push("/signup")}>
              Sign up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};

export default SignIn;

SignIn.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>> & ReactNode
) => {
  return (
    <AccountLayout heading="Log in" thumbnail={loginBg}>
      {page}
    </AccountLayout>
  );
};
