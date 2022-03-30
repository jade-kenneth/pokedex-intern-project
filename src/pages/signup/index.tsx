import React, {
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { Stack, Text, useColorModeValue, Link } from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signIn } from "next-auth/react";
import { FormProps } from "src/interfaces/Form";
import signupBg from "public/backgrounds/signupBg.png";
import { useRouter } from "next/router";
import AccountLayout from "src/components/Layouts/account-layout/AccountLayout";
import InputWithValidator from "src/components/Form/InputWithValidator";
import { SignupInputs } from "src/interfaces/Input";
import FormButton from "src/components/Form/FormButton";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  firstName: yup
    .string()
    .min(3, "First name must be atleast 3 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Last name must be atleast 3 characters")
    .required("Last name is required"),
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
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    setLoading(true);
    await signIn(provider?.credentials.id, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,

      callbackUrl: "/home",
    });
    setLoading(false);
  };
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <InputWithValidator
          check={errors.firstName}
          errorMessage={errors.firstName?.message}
          type="text"
          placeholder="Enter first name"
          {...register("firstName", { required: true })}
        >
          First name
        </InputWithValidator>

        <InputWithValidator
          check={errors.lastName}
          errorMessage={errors.lastName?.message}
          type="text"
          placeholder="Enter last name"
          {...register("lastName", { required: true })}
        >
          Last name
        </InputWithValidator>
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

        <FormButton isLoading={loading} loadingText="Creating account...">
          Create account
        </FormButton>

        <Stack>
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
