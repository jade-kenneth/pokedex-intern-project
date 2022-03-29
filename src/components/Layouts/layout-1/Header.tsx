import { useEffect, useState } from "react";
import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { MY_ACCOUNT } from "src/graphql/auth/query/me";
import apolloClient from "src/apollo/apollo-client";
import { signOut, useSession } from "next-auth/react";
// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );
type UserState = {
  me: {
    id: string;
    lastname: string;
    firstname: string;
    createdAt: string;
  };
};
export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState<UserState | null>(null);
  const session = useSession({ required: true });
  useEffect(() => {
    (async function getUser() {
      const { data } = await apolloClient.query({
        query: MY_ACCOUNT,
      });
      setUser(data);
    })();
  }, []);
  return (
    <>
      <Flex
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("gray.100", "secondary")}
        align="center"
        h="100%"
        px={10}
        zIndex={999}
        position="relative"
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
        >
          <Heading color="primary">Pokedex</Heading>

          <Flex alignItems={"center"} justify="space-between">
            <Stack direction={"row"} spacing={5}>
              <Center display={{ base: "none", lg: "flex" }}>
                Welcome, {user?.me?.firstname}
              </Center>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.me.firstname}</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem
                    onClick={() =>
                      signOut({
                        callbackUrl: "/signin",
                      })
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
