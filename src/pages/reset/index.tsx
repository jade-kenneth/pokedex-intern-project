import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import AccountLayout from "src/components/Layouts/account-layout/AccountLayout";
import resetBg from "public/backgrounds/resetBg.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetInputs } from "src/interfaces/Input";

import { FormProps } from "src/interfaces/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import InputWithValidator from "src/components/Form/InputWithValidator";
import {
  Stack,
  Text,
  Link,
  Heading,
  Box,
  toast,
  useToast,
} from "@chakra-ui/react";
import FormButton from "src/components/Form/FormButton";
import { useMutation } from "@apollo/client";
import {
  GENERATE_PASSWORD_RESET_LINK,
  TRIGGER_RESET_PASSWORD,
} from "src/graphql/auth/mutations/passwordReset";
import {
  generatePasswordResetLink,
  generatePasswordResetLinkVariables,
} from "src/types/auth/generatePasswordResetLink";
import {
  triggerResetPassword,
  triggerResetPasswordVariables,
} from "src/types/auth/triggerResetPassword";
import ChangePasswordForm from "src/components/Reset/ChangePasswordForm";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
});

const Reset = ({ provider }: FormProps) => {
  const [access, setAccess] = useState<boolean | undefined>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [triggerResetPassword, {}] = useMutation<
    triggerResetPassword,
    triggerResetPasswordVariables
  >(TRIGGER_RESET_PASSWORD);

  const [generatePasswordResetLink, {}] = useMutation<
    generatePasswordResetLink,
    generatePasswordResetLinkVariables
  >(GENERATE_PASSWORD_RESET_LINK);
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetInputs> = async (data) => {
    try {
      const { data: trigger } = await triggerResetPassword({
        variables: { emailAddress: data.email },
      });

      const { data: resetLink } = await generatePasswordResetLink({
        variables: {
          emailAddress: data.email,
          baseURL: router.pathname,
        },
      });

      setAccess(trigger?.triggerPasswordReset);
      router.push(`${resetLink?.generatePasswordResetLink}`);
    } catch (error: any) {
      toast({
        position: "top",

        description: `${error.message}`,
        status: "error",
        // render: () => `${error.message}`,
        // render: () => (
        //   <Box color="black" p={3} bg="white">
        //     {`😵‍💫 ${error?.message!}`}
        //   </Box>
        // ),
      });
    }
  };

  return (
    <>
      <Stack align={"flex-start"}>
        <Heading fontSize={"3rem"} textAlign={"center"}>
          {access ? "Change Password" : "Forgot Password"}
        </Heading>
      </Stack>
      {!access ? (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <InputWithValidator
                check={errors.email}
                errorMessage={errors.email?.message}
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              >
                Email
              </InputWithValidator>

              <FormButton>Send password reset link</FormButton>

              <Stack>
                <Text align={"center"}>
                  Remember your password?{" "}
                  <Link
                    color={"primary"}
                    onClick={() => router.push("/signin")}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>{" "}
        </Box>
      ) : (
        <ChangePasswordForm />
      )}
    </>
  );
};

export default Reset;

Reset.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>> & ReactNode
) => {
  return <AccountLayout thumbnail={resetBg}>{page}</AccountLayout>;
};
