import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import AccountLayout from "src/components/layout/account-layout/AccountLayout";
import resetBg from "public/backgrounds/resetBg.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetInputs } from "src/types/Input";
import { signIn } from "next-auth/react";
import { FormProps } from "src/types/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import InputWithValidator from "src/components/Form/InputWithValidator";
import { Stack, Text, Link } from "@chakra-ui/react";
import FormButton from "src/components/Form/FormButton";
let schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
const Reset = ({ provider }: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<ResetInputs> = (data) => {
    signIn(provider?.credentials.id, {
      email: data.email,

      callbackUrl: "http://localhost:3000/about",
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
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
          Email
        </InputWithValidator>

        <FormButton>Send password reset link</FormButton>

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

export default Reset;

Reset.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>> & ReactNode
) => {
  return (
    <AccountLayout heading="Forgot password" thumbnail={resetBg}>
      {page}
    </AccountLayout>
  );
};
