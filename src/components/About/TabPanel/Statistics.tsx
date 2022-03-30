import {
  Flex,
  HStack,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import getWeaknessStrengthByType, {
  IWeaknessStrength,
} from "src/helpers/getWeaknessStrengthByType";

import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { statistic_data } from "src/utils/pokemonStatisticData";
import Loading from "src/components/Homepage/widgets/Loading";
import { GetEachPokemon } from "src/types/pokemon/GetEachPokemon";
const Statistics = ({ pokemonDetails }: GetEachPokemon) => {
  const state = usePokemonDetailStore((state) => state);
  const progressBg = useColorModeValue("gray.300", "white");
  const containerBg = useColorModeValue("white", "secondary");
  const [data, setData] = useState<{
    weakness: IWeaknessStrength[];
    resistance: IWeaknessStrength[];
  }>({ weakness: [], resistance: [] });

  useEffect(() => {
    (async function getData() {
      const { resistance, weakness } = await getWeaknessStrengthByType({
        types: pokemonDetails?.types!,
      });

      setData({
        weakness: weakness,
        resistance: resistance,
      });
    })();
    return () => setData({ weakness: [], resistance: [] });
  }, [pokemonDetails?.types]);

  return (
    <Stack spacing={"3.25rem"} mb={"6.063rem"} w="100%">
      <VStack
        py={"1.563rem"}
        px={"2.25rem"}
        spacing={"0.5rem"}
        border="1px"
        borderColor={"gray.300"}
        bg={containerBg}
      >
        {state.pokemonDetails.stats.map((stat, idx) => {
          return (
            <Flex
              key={idx}
              h={"1.625rem"}
              gap={"2.125rem"}
              width="100%"
              align="center"
            >
              <Text flex="0.2" w={"3rem"}>
                {statistic_data[idx].name}
              </Text>

              <Progress
                value={stat.base_stat}
                width="100%"
                flex="3"
                bg={progressBg}
                size="xs"
                colorScheme={statistic_data[idx].color}
              />

              <Text flex="0.3">{stat.base_stat}%</Text>
            </Flex>
          );
        })}
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        p={"1.5rem"}
        spacing={"1.5rem"}
        bg={containerBg}
      >
        <Text color="tertiary">Weakness</Text>
        <VStack align="left" spacing={"1rem"}>
          {state.pokemonDetails.types.map((t, rootIdx) => {
            const { type } = t;
            return (
              <VStack align={"left"} spacing={"1rem"} key={type?.name}>
                <Text textTransform={"capitalize"} color="tertiary">
                  {type?.name}
                </Text>
                <Flex key={type?.name} gap={"1rem"} flexWrap={"wrap"}>
                  {data.weakness.length > 0
                    ? data.weakness[rootIdx][`${type?.name!}`]?.map(
                        (type, branchIdx) => {
                          return (
                            <Tag
                              key={branchIdx}
                              py={"0.438rem"}
                              px={"1.906rem"}
                              color="red"
                            >
                              {type}
                            </Tag>
                          );
                        }
                      )
                    : null}
                </Flex>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        p={"1.5rem"}
        spacing={"1.5rem"}
        bg={containerBg}
      >
        <Text color="tertiary">Resistance</Text>

        <VStack align="left" spacing={"1rem"}>
          {state.pokemonDetails.types.map((t, rootIdx) => {
            const { type } = t;
            return (
              <VStack align={"left"} spacing={"1rem"} key={type?.name}>
                <Text textTransform={"capitalize"} color="tertiary">
                  {type?.name}
                </Text>
                <Flex key={type?.name} gap={"1rem"} flexWrap={"wrap"}>
                  {data.resistance.length > 0
                    ? data.resistance[rootIdx][`${type?.name}`]?.map(
                        (type, branchIdx) => {
                          return (
                            <Tag
                              key={branchIdx}
                              py={"0.438rem"}
                              px={"1.906rem"}
                              color="green"
                            >
                              {type}
                            </Tag>
                          );
                        }
                      )
                    : null}
                </Flex>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Statistics;
