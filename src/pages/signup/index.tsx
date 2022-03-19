import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { Stack, Text, useColorModeValue, Link } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signIn } from "next-auth/react";
import { FormProps } from "src/types/Form";
import signupBg from "public/backgrounds/signupBg.png";
import { useRouter } from "next/router";
import AccountLayout from "src/components/layout/account-layout/AccountLayout";
import InputWithValidator from "src/components/Form/InputWithValidator";
import { SignupInputs } from "src/types/Input";
import FormButton from "src/components/Form/FormButton";

let schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  firstName: yup.string().min(3).required("First name is required"),
  lastName: yup.string().min(3).required("Last name is required"),
  password: yup
    .string()

    .required("Password is required"),
});
const Signup = ({ provider }: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    signIn(provider?.credentials.id, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,

      callbackUrl: "http://localhost:3000/homepage",
    });
  };
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <InputWithValidator
          check={errors.firstName}
          errorMessage={errors.firstName?.message}
          required={true}
          type="text"
          register={register}
          placeholder="Enter first name"
          id="firstName"
          autoComplete="off"
          focusBorderColor={"primary"}
        >
          First name
        </InputWithValidator>
        <InputWithValidator
          check={errors.lastName}
          errorMessage={errors.lastName?.message}
          required={true}
          type="text"
          register={register}
          placeholder="Enter last name"
          id="lastName"
          autoComplete="off"
          focusBorderColor={"primary"}
        >
          Last name
        </InputWithValidator>
        <InputWithValidator
          check={errors.email}
          errorMessage={errors.email?.message}
          required={true}
          type="email"
          register={register}
          placeholder="Enter email"
          id="email"
          autoComplete="off"
          focusBorderColor={"primary"}
        >
          Email Address
        </InputWithValidator>

        <InputWithValidator
          check={errors.password}
          errorMessage={errors.password?.message}
          required={true}
          type="password"
          register={register}
          placeholder="Password"
          id="password"
          autoComplete="off"
          focusBorderColor={"primary"}
        >
          Password
        </InputWithValidator>

        <FormButton>Create account</FormButton>

        <Stack pt={"3rem"}>
          <Text align={"center"}>
            Already have an account?{" "}
            <Link color={"primary"} onClick={() => router.push("/signin")}>
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};

export default Signup;

Signup.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>> & ReactNode
) => {
  return (
    <AccountLayout heading="Sign up" thumbnail={signupBg}>
      {page}
    </AccountLayout>
  );
};
