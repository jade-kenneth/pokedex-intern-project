import { Box, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
import Image from "next/image";

import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { AccountLayoutProps } from "src/interfaces/AccountLayout";
import { useRouter } from "next/router";

import Layout1 from "../layout-1/Layout1";

const AccountLayout = ({
  thumbnail,
  children,
  heading,
}: AccountLayoutProps) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const router = useRouter();
  const toaster = useToast();
  const { status } = useSession();
  useEffect(() => {
    (async function getProvider() {
      const provider = await getProviders();
      setProviders(provider);
    })();
  }, []);
  if (status === "authenticated") {
    router.push("/home");
  }
  // useEffect(() => {
  //   if (router.query.error) {
  //     toaster({
  //       position: "top",
  //       render: () => (
  //         <Box color="black" p={3} bg="white">
  //           {`😵‍💫 ${router.query.error}`}
  //         </Box>
  //       ),
  //     });
  //   }
  // }, [router.query]);

  return (
    <>
      {" "}
      <Stack
        minH={"100vh"}
        bg={"bg"}
        color="white"
        direction={{ lg: "row-reverse" }}
      >
        {/** flex 1.5 to dominate login page than background  */}
        <Flex flex={1.5}>
          {/** changing width to 100% to fully expand when mobile view to center */}
          {/**setting width to 80% and  to not fully expand and centering - imitating a padding like */}

          <Flex
            minH={"100vh"}
            w={{ base: "100%", lg: "80%" }}
            align={"center"}
            justify={"center"}
          >
            {/**width set to 400px - input / button will adapt without setting each widths */}

            <Stack spacing={"2rem"} maxW={"xl"} w={"400px"} justify="center">
              <Stack align={"flex-start"}>
                <Heading fontSize={"3rem"} textAlign={"center"}>
                  {heading}
                </Heading>
              </Stack>
              {React.cloneElement(children, { provider: providers })}
            </Stack>
          </Flex>
        </Flex>
        {/** flex 1.5 to dominate login page than background  */}
        <Flex flex={1} display={{ base: "none", lg: "flex" }}>
          <Image alt={"Login Image"} objectFit={"cover"} src={thumbnail} />
        </Flex>
      </Stack>
    </>
  );
};

export default AccountLayout;
