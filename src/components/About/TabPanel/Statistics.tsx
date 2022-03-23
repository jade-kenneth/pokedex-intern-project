import {
  Box,
  Button,
  Flex,
  HStack,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useGetDamageByTypes } from "src/helpers/getDamageByTypes";
import useStore from "src/hooks/useStore";
import { statistic_data } from "src/utils/pokemonStatisticData";

const Statistics = () => {
  const state = useStore((state) => state);
  // const { data } = useGetDamageByTypes({ types: state.pokemonDetails.types });
  const progressBg = useColorModeValue("gray.300", "white");
  const containerBg = useColorModeValue("white", "secondary");
  const [data, setData] = useState<any>();
  useEffect(() => {
    (function getData() {
      state.pokemonDetails.types.map(async (type) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${type.type?.name}`
        );

        const dataFetched = await response.json();
        setData({
          ...data,
          type: type.type?.name,
          weakness: dataFetched.damage_relations.double_damage_from,
          strength: dataFetched.damage_relations.double_damage_to,
        });
        console.log("data", dataFetched);
      });
    })();
  }, []);
  console.log(data);
  if (data) return <h2>Loading....</h2>;

  return (
    <Stack spacing={"3.25rem"} mb={"6.063rem"}>
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
        bg={containerBg}
      >
        <Text color={"tertiary"} mb={"1.5rem"}>
          Weaknesses
        </Text>
        <Flex flexWrap={"wrap"} rowGap={"1rem"} columnGap={"2rem"}>
          {/* {data.weakness.map((data: any) => {
            return (
              <HStack spacing={"1.5rem"} key={data.name}>
                <Tag
                  py={"0.438rem"}
                  px={"1.75rem"}
                  fontSize={"0.75rem"}
                  color="green"
                  // bg={useColorModeValue("gray.100", "white")}
                >
                  {data.name}
                </Tag>
                <HStack>
                  <Text color={"green"}>160%</Text>
                  <Text>damage</Text>
                </HStack>
              </HStack>
            );
          })} */}
        </Flex>
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        p={"1.5rem"}
        bg={containerBg}
      >
        <Text color={"tertiary"} mb={"1.5rem"}>
          Resistant
        </Text>
        <Flex flexWrap={"wrap"} rowGap={"1rem"} columnGap={"2rem"}>
          {/* {data.strength.map((data: any) => {
            return (
              <HStack spacing={"1.5rem"} key={data.name}>
                <Tag
                  py={"0.438rem"}
                  px={"1.75rem"}
                  fontSize={"0.75rem"}
                  color="green"
                  // bg={useColorModeValue("gray.100", "white")}
                >
                  {data.name}
                </Tag>
                <HStack>
                  <Text color={"green"}>160%</Text>
                  <Text>damage</Text>
                </HStack>
              </HStack>
            );
          })} */}
        </Flex>
      </VStack>
    </Stack>
  );
};

export default Statistics;
