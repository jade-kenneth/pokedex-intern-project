import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { usePokemonGenderIdentifier } from "src/hooks/usePokemonGenderIdentifier";
import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";

const About = () => {
  const state = usePokemonDetailStore((state) => state);
  const { gender } = usePokemonGenderIdentifier({
    gender_rate: state.pokemonDetails.pokemon_specy?.gender_rate,
  });
  const eggBreedBg = useColorModeValue("gray.300", "gray");
  return (
    <Stack spacing={"2rem"} mb={"5.5rem"}>
      <Text lineHeight="1.625rem">
        {state.pokemonDetails.pokemon_specy?.description.length! > 0
          ? state.pokemonDetails.pokemon_specy?.description[0].flavor_text.replace(
              "//g",
              " "
            )
          : " No available data "}
      </Text>

      <HStack
        justify="space-between"
        w={"16.375rem"}
        h={"6.75rem"}
        p={"1rem"}
        bg={useColorModeValue("gray.100", "secondary")}
        border="1px"
        borderColor={"gray.300"}
      >
        <VStack spacing="0.5rem" align="center" justify="center" w="100%">
          <Text color={"tertiary"}>Weight</Text>
          <Text>{state.pokemonDetails.weight?.toFixed(2)}KG</Text>
        </VStack>
        <Divider orientation="vertical" borderColor={"black.800"} />
        <VStack spacing="0.5rem" align="center" justify="center" w="100%">
          <Text color={"tertiary"}>Height</Text>
          <Text>{state.pokemonDetails.height?.toFixed(2)}M</Text>
        </VStack>
      </HStack>
      <Box
        w={"36.5rem"}
        h={"6.875rem"}
        bg={useColorModeValue("gray.100", "secondary")}
        border="1px"
        borderColor={"gray.300"}
        p={"1.5rem"}
      >
        <VStack align="start">
          <Text color={"tertiary"}>Breed</Text>
          <Stack direction={"row"} spacing={"2.25rem"}>
            <HStack>
              <Text>Gender:</Text>
              <Text>{gender}</Text>
            </HStack>
            <HStack align={"end"}>
              <Text>Egg Group:</Text>

              {state.pokemonDetails.pokemon_specy?.eggroups.length! > 0 &&
                state.pokemonDetails.pokemon_specy?.eggroups.map((data) => {
                  return (
                    <Tag size="sm" bg={eggBreedBg} key={data.names?.name}>
                      {data.names?.name}
                    </Tag>
                  );
                })}
            </HStack>
            <HStack>
              <Text>Egg Cycle:</Text>
              <Text>{state.pokemonDetails.pokemon_specy?.egg_cycle}</Text>
            </HStack>
          </Stack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default About;
