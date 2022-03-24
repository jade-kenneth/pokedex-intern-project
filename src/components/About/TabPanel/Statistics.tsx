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
import getWeaknessStrengthByType from "src/helpers/getWeaknessStrengthByType";

import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { statistic_data } from "src/utils/pokemonStatisticData";

const Statistics = () => {
  const state = usePokemonDetailStore((state) => state);

  const [data, setData] = useState<any>({ weakness: [], resistance: [] });

  useEffect(() => {
    (async function getData() {
      const { resistance, weakness } = await getWeaknessStrengthByType({
        types: state.pokemonDetails.types,
      });
      setData({
        weakness: weakness,
        resistance: resistance,
      });
    })();
  }, [state.pokemonDetails.types]);

  const progressBg = useColorModeValue("gray.300", "white");
  const containerBg = useColorModeValue("white", "secondary");

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
            <HStack key={idx} h={"1.625rem"} spacing={"2.125rem"} width="100%">
              <Text w={"2.184rem"}>{statistic_data[idx].name}</Text>

              <Progress
                value={stat.base_stat}
                width="100%"
                bg={progressBg}
                size="xs"
                colorScheme={statistic_data[idx].color}
              />

              <Text>{stat.base_stat}</Text>
            </HStack>
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
          <Flex gap={"1rem"} flexWrap={"wrap"}>
            {data.weakness.map((data: any, idx: number) => {
              const { name } = data;
              return (
                <Tag key={idx} py={"0.438rem"} px={"1.906rem"} color="red">
                  {data}
                </Tag>
              );
            })}
          </Flex>
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

        <VStack spacing={"1rem"} align="left">
          <Flex gap={"1rem"} flexWrap={"wrap"}>
            {data.resistance.map((data: any, idx: number) => {
              return (
                <Tag key={idx} py={"0.438rem"} px={"1.906rem"} color="green">
                  {data}
                </Tag>
              );
            })}
          </Flex>
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Statistics;
