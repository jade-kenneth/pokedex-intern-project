import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import loginBg from "public/backgrounds/loginBg.png";
import { FaLongArrowAltRight } from "react-icons/fa";
const Evolutions = () => {
  return (
    <VStack align="left" mb={"6.188rem"}>
      <Text
        fontSize={"0.875rem"}
        mb={"1rem"}
        lineHeight={"1.313rem"}
        w={"25.188rem"}
      >
        There are currently a total of 9 Pokémon in the Eevee family. Flareon
        evolves from Eevee which costs 25 Candy.
      </Text>
      <Stack
        py={"2rem"}
        px={"7.031rem"}
        spacing={"1.5rem"}
        w="100%"
        bg={useColorModeValue("white", "secondary")}
        border="1px"
        borderColor={"gray.300"}
      >
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
        <HStack spacing={"11.5rem"} w="100%">
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
          <VStack align="center" spacing={"0.375rem"}>
            <Icon
              as={FaLongArrowAltRight}
              w={"2rem"}
              h={"1.25rem"}
              color="primary"
            />
            <Text>10</Text>
          </VStack>
          <VStack align="center">
            <Box h={"5.5rem"} w={"5.5rem"} position="relative">
              <Image src={loginBg} alt="evolution" layout="fill" />
            </Box>
            <Text>Eevee</Text>
          </VStack>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default Evolutions;
