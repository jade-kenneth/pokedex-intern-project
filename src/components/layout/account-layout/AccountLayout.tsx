import { Flex, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";

import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import React, { useEffect, useState } from "react";
import { AccountLayoutProps } from "src/types/AccountLayout";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const AccountLayout: React.FC<AccountLayoutProps> = ({
  thumbnail,
  children,
  heading,
}) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async function getProvider() {
      const provider = await getProviders();
      setProviders(provider);
    })();
  }, []);
  useEffect(() => {
    if (router.query.error) {
      toast(`${router.query.error}`, {
        duration: 3000,
        position: "top-center",
        // Styling
        style: {},

        // Custom Icon
        icon: "😵‍💫",
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  }, [router.query]);
  return (
    <Stack
      minH={"100vh"}
      bg={"bg"}
      color="white"
      direction={{ base: "column", md: "row-reverse" }}
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
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={thumbnail} />
      </Flex>
    </Stack>
  );
};

export default AccountLayout;
