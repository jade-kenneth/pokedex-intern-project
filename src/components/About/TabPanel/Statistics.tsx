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
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getWeaknessStrengthByType } from "src/helpers/getWeaknessStrengthByType";

import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { statistic_data } from "src/utils/pokemonStatisticData";

const Statistics = () => {
  const state = usePokemonDetailStore((state) => state);
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    (async function getData() {
      const data = await getWeaknessStrengthByType({
        types: state.pokemonDetails.types,
      });

      setData(data);
      console.log("w");
    })();
  }, [state.pokemonDetails]);
  const weaknessType = ["DOUBLE_DAMAGE_FROM", "HALF_DAMAGE_TO", "NO_DAMAGE_TO"];
  const strengthType = [
    "DOUBLE_DAMAGE_TO",
    "HALF_DAMAGE_FROM",
    "NO_DAMAGE_FROM",
  ];
  const progressBg = useColorModeValue("gray.300", "white");
  const containerBg = useColorModeValue("white", "secondary");

  if (data.length <= 0) return <h2>Loading....</h2>;
  console.log(data);
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
        <VStack
          flexWrap={"wrap"}
          spacing={"0.5rem"}
          rowGap={"1rem"}
          columnGap={"2rem"}
          align={"left"}
        >
          <Text color={"tertiary"} mb={"0.5rem"}>
            Weaknesses
          </Text>
          {data.map((data: any) => {
            const { data: weakness, type } = data;
            return (
              <VStack spacing={"1rem"} align={"left"} key={type}>
                <Text color={"tertiary"} textTransform="capitalize">
                  {type}
                </Text>
                <VStack spacing={"1rem"} align="left">
                  {weakness.weakness.map((w: any, idx: any) => {
                    return (
                      <VStack key={idx} align="left">
                        <Text>{weaknessType[idx].replace(/_/g, " ")}</Text>
                        <Flex flexWrap={"wrap"} gap={"1rem"}>
                          {weakness.weakness[idx][weaknessType[idx]].length >
                          0 ? (
                            weakness.weakness[idx][weaknessType[idx]].map(
                              (data: any) => {
                                return (
                                  <HStack spacing={"1.5rem"} key={data.name}>
                                    <Tag
                                      py={"0.438rem"}
                                      px={"1.75rem"}
                                      fontSize={"0.75rem"}
                                      color="red"
                                      // bg={useColorModeValue("gray.100", "white")}
                                    >
                                      {data.name}
                                    </Tag>
                                    {/* <HStack>
                            <Text color={"red"}>160%</Text>
                            <Text>damage</Text>
                          </HStack> */}
                                  </HStack>
                                );
                              }
                            )
                          ) : (
                            <Tag
                              py={"0.438rem"}
                              px={"1.75rem"}
                              fontSize={"0.75rem"}
                              color="red"
                              // bg={useColorModeValue("gray.100", "white")}
                            >
                              No data
                            </Tag>
                          )}
                        </Flex>
                      </VStack>
                    );
                  })}
                </VStack>
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
        bg={containerBg}
      >
        <VStack
          flexWrap={"wrap"}
          spacing={"0.5rem"}
          rowGap={"1rem"}
          columnGap={"2rem"}
          align={"left"}
        >
          <Text color={"tertiary"} mb={"0.5rem"}>
            Resistance
          </Text>
          {data.map((data: any) => {
            const { data: strength, type } = data;
            return (
              <VStack spacing={"1rem"} align={"left"} key={type}>
                <Text color={"tertiary"} textTransform="capitalize">
                  {type}
                </Text>
                <VStack spacing={"1rem"} align="left">
                  {strength.strength.map((w: any, idx: any) => {
                    return (
                      <VStack key={idx} align="left">
                        <Text>{strengthType[idx].replace(/_/g, " ")}</Text>
                        <Flex flexWrap={"wrap"} gap={"1rem"}>
                          {strength.strength[idx][strengthType[idx]].length >
                          0 ? (
                            strength.strength[idx][strengthType[idx]].map(
                              (data: any) => {
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
                                    {/* <HStack>
                            <Text color={"red"}>160%</Text>
                            <Text>damage</Text>
                          </HStack> */}
                                  </HStack>
                                );
                              }
                            )
                          ) : (
                            <Tag
                              py={"0.438rem"}
                              px={"1.75rem"}
                              fontSize={"0.75rem"}
                              color="red"
                              // bg={useColorModeValue("gray.100", "white")}
                            >
                              No data
                            </Tag>
                          )}
                        </Flex>
                      </VStack>
                    );
                  })}
                </VStack>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Statistics;
