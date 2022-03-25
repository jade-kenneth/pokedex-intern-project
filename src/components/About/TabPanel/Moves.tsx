import {
  Button,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Stack,
  Tag,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";

const Moves = () => {
  const state = usePokemonDetailStore((state) => state);
  const tagBg = useColorModeValue("gray.300", "white");

  return (
    <Stack spacing={"2rem"} mb={"8.313rem"}>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        py={"1.938rem"}
        px={"2.906rem"}
        bg={useColorModeValue("white", "secondary")}
      >
        <Flex direction={"column"}>
          <HStack align="start" w="100%" justify="space-between">
            <Text color={"tertiary"}>Quick Moves</Text>
            <HStack
              borderBottomColor={"white"}
              borderBottom="1px"
              pb="0.625rem"
            >
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                Damage
              </Text>
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                DPS
              </Text>
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                EPS
              </Text>
            </HStack>
          </HStack>

          {state.pokemonDetails.abilities.map((data, idx) => {
            const { ability } = data;
            return (
              <HStack w="100%" key={idx} justify="space-between" align="center">
                <Tag
                  py={"0.438rem"}
                  px={"1.469rem"}
                  bg={tagBg}
                  color={"tertiary"}
                >
                  {ability?.name}
                </Tag>
                <HStack
                  borderBottomColor={"white"}
                  h={"3.188rem"}
                  borderBottom="1px"
                >
                  <Text w="5.688rem" textAlign={"center"}>
                    10
                  </Text>
                  <Text w="5.688rem" textAlign={"center"}>
                    10
                  </Text>
                  <Text w="5.688rem" textAlign={"center"}>
                    10
                  </Text>
                </HStack>
              </HStack>
            );
          })}
        </Flex>
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        py={"1.938rem"}
        px={"2.906rem"}
        bg={useColorModeValue("white", "secondary")}
        mb={"1.5rem"}
      >
        <Flex direction={"column"}>
          <HStack align="start" w="100%" justify="space-between">
            <Text color={"tertiary"}>Main Moves</Text>
            <HStack
              borderBottomColor={"white"}
              borderBottom="1px"
              pb="0.625rem"
            >
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                Damage
              </Text>
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                DPS
              </Text>
              <Text w="5.688rem" fontSize={"0.875rem"} textAlign={"center"}>
                EPS
              </Text>
            </HStack>
          </HStack>

          {state.pokemonDetails.moves.map((data, idx) => {
            const { move } = data;
            return (
              <HStack w="100%" key={idx} justify="space-between" align="center">
                <Tag
                  py={"0.438rem"}
                  px={"1.469rem"}
                  bg={tagBg}
                  color={"tertiary"}
                >
                  {move?.name}
                </Tag>
                <HStack
                  borderBottomColor={"white"}
                  h={"3.188rem"}
                  borderBottom="1px"
                >
                  <Text w="5.688rem" textAlign={"center"}>
                    {move?.power}
                  </Text>
                  <Text w="5.688rem" textAlign={"center"}>
                    {move?.pp}
                  </Text>
                  <Text w="5.688rem" textAlign={"center"}>
                    {move?.pp}
                  </Text>
                </HStack>
              </HStack>
            );
          })}
        </Flex>
      </VStack>
      <HStack justify={"flex-end"} align="center">
        <Button
          rightIcon={<MdKeyboardArrowDown />}
          colorScheme="transparent"
          color="primary"
          p={0}
        >
          See more
        </Button>
      </HStack>
    </Stack>
  );
};

export default Moves;
