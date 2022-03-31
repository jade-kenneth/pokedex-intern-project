import {
  Button,
  Center,
  CircularProgress,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import pokeball from "public/backgrounds/pokeballBg.png";
import Image from "next/image";
import { useRouter } from "next/router";

interface Loading {
  type: "loading";
  message?: never;
}
interface Error {
  type: "error";
  message: string;
}
type LoadingProps = Loading | Error;
const Loading: React.FC<LoadingProps> = ({ type, message }) => {
  const router = useRouter();
  return (
    <Center height="85vh">
      {type === "loading" ? (
        <CircularProgress
          size="150px"
          isIndeterminate
          color="green.300"
          position="relative"
        >
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Image src={pokeball} alt="loader" height="90px" width="90px" />
          </Flex>
        </CircularProgress>
      ) : (
        <VStack spacing={"1rem"}>
          <Text fontSize="xl">
            Something went wrong!{" "}
            <Text
              as="span"
              height="3rem"
              width="auto"
              textAlign="center"
              bg="black"
              color="white"
              borderRadius="lg"
              px={1}
            >
              {" "}
              {message}
            </Text>
          </Text>
          <Button bg={"blue.600"} onClick={() => router.push("/home")}>
            See pokemons
          </Button>
        </VStack>
      )}
    </Center>
  );
};

export default Loading;
