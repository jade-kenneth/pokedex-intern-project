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
import React, { useEffect } from "react";

import { FaLongArrowAltRight } from "react-icons/fa";
import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { getPokemonNameById } from "src/helpers/getPokemonNameById";
import { getEvolutionCosts } from "src/helpers/getEvolutionCosts";
const Evolutions = () => {
  /**need fixin */
  const state = usePokemonDetailStore((state) => state);
  const evolutions =
    state.pokemonDetails.pokemon_specy?.evolution_chain?.evolutions!;
  const { names } = getPokemonNameById({ pokemonData: evolutions });
  const { levelCost } = getEvolutionCosts({
    pokemon_specy_evolutions: evolutions,
    id: state.pokemonDetails.id,
  });

  return (
    <VStack align="left" mb={"6.188rem"}>
      <Text
        fontSize={"0.875rem"}
        mb={"1rem"}
        lineHeight={"1.313rem"}
        w={"25.188rem"}
      >
        There are currently a total of {evolutions.length} Pokémon in the{" "}
        <Text as="span" textTransform="capitalize">
          {names[`${evolutions[0]?.id}`]}
        </Text>{" "}
        family.{" "}
        <Text as="span" textTransform="capitalize">
          {names[`${state.pokemonDetails.id}`]}{" "}
        </Text>{" "}
        evolves from{" "}
        <Text as="span" textTransform="capitalize">
          {names[`${state.pokemonDetails.id - 1}`] === undefined
            ? names[`${state.pokemonDetails.id}`]
            : names[`${state.pokemonDetails.id - 1}`]}
        </Text>{" "}
        which costs {typeof levelCost === "number" ? levelCost : "Unknown"}{" "}
        minimum level.
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
        {evolutions.map((evolution, idx) => {
          const { evovleTrigger, evolveFrom, id, name } = evolution;

          return (
            <HStack key={idx} justify={"space-between"} w="100%">
              <VStack align="center">
                <Box h={"5.5rem"} w={"5.5rem"} position="relative">
                  {/** evolveFrom holds an id of which evolution will might
                     * happen/
                     * trigger else get the default id
                     * 
                     * example data fetched pokedetails/80
                     * : 0: {__typename: 'pokemon_v2_pokemonspecies', evovleTrigger: Array(0), id: 79, evolveFrom: null, name: 'slowpoke'}
                        1: {__typename: 'pokemon_v2_pokemonspecies', evovleTrigger: Array(2), id: 80, evolveFrom: 79, name: 'slowbro'}
                        2: {__typename: 'pokemon_v2_pokemonspecies', evovleTrigger: Array(2), id: 199, evolveFrom: 79, name: 'slowking'}
                     */}
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                      evolveFrom !== null ? evolveFrom : id
                    }.png`}
                    alt="evolution"
                    layout="fill"
                  />
                </Box>

                <Text>
                  {/**
                   * if evolveFrom equal to null (no evolution)
                   *
                   */}
                  {evolveFrom !== null ? names[`${evolveFrom}`] : name}
                </Text>
              </VStack>
              <VStack align="center" spacing={"0.375rem"}>
                <Icon
                  as={FaLongArrowAltRight}
                  w={"2rem"}
                  h={"1.25rem"}
                  color="primary"
                />
                <Text>
                  {evovleTrigger.length > 0
                    ? evovleTrigger[0].min_level === null
                      ? "?"
                      : evovleTrigger[0].min_level
                    : "1"}
                </Text>
              </VStack>
              <VStack align="center">
                <Box h={"5.5rem"} w={"5.5rem"} position="relative">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                    alt="evolution"
                    layout="fill"
                  />
                </Box>
                {/** use  */}
                <Text>{name}</Text>
              </VStack>
            </HStack>
          );
        })}
      </Stack>
    </VStack>
  );
};

export default Evolutions;
