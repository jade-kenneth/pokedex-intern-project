import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Grid,
  HStack,
  Icon,
  Progress,
  Stack,
  Tag,
  Text,
  useDisclosure,
  useQuery,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiBattleGear } from "react-icons/gi";
import beginBattleBg from "public/backgrounds/beginBattleBg1.png";
import { GET_EACH_POKEMON } from "src/graphql/pokemon/queries/pokemon";

import getBattleDataByIds, {
  getBattleDataByIdsProps,
  IBattleData,
} from "src/helpers/getBattleDataByIds";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import Loading from "src/components/Homepage/widgets/Loading";
import useBattleState from "src/hooks/useBattleState";
import getWeaknessStrengthByType, {
  IUnfilteredWeaknessStrength,
  IWeaknessStrength,
} from "src/helpers/getWeaknessStrengthByType";
import getPlayerBuff from "src/helpers/getPlayerBuff";

interface CombineStats {
  opponentUnFilteredResistance: string[];
  opponentUnFilteredWeakness: string[];
  playerUnFilteredResistance: string[];
  playerUnFilteredWeakness: string[];
}

interface IBuffs {
  opponent: Array<{
    attack: number;
    fromPlayerWeakness: string;
  }>;
  player: Array<{
    attack: number;
    fromPlayerWeakness: string;
  }>;
}
const Fight = () => {
  const router = useRouter();

  const [time, setTime] = useState(3);
  const [running, setRunning] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [battleData, setBattleData] = useState<IBattleData["battleData"]>();
  const battleState = useBattleState((state) => state);
  const [cap, setCap] = useState<CombineStats>();
  let opponentUnFilteredResistance: string[] = [];
  let opponentUnFilteredWeakness: string[] = [];
  let playerUnFilteredResistance: string[] = [];
  let playerUnFilteredWeakness: string[] = [];
  const [playerBuffs, setPlayerBuffs] = useState<IBuffs>({
    opponent: [],
    player: [],
  });
  /** Note: Opponent = me or you
   * Player = Chosen player/pokemon to fight
   */
  // console.log({ playerWeakness: { ...playerWeakness } });
  const ids: getBattleDataByIdsProps["ids"] = [
    { id: `${battleState.opponentId}` },
    { id: `${battleState.playerId}` },
  ];
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
        if (time <= 0) {
          setTime(0);
          setRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, time]);
  useEffect(() => {
    (async function getBattleData() {
      const { battleData } = await getBattleDataByIds(ids);
      const {
        unFilteredResistance: opponentUnFilteredResistance,
        unFilteredWeakness: opponentUnFilteredWeakness,
      } = await getWeaknessStrengthByType({
        types: battleData[0]?.types!,
      });
      const {
        unFilteredResistance: playerUnFilteredResistance,
        unFilteredWeakness: playerUnFilteredWeakness,
      } = await getWeaknessStrengthByType({
        types: battleData[1]?.types!,
      });
      {
        /** NOTE: OPPONENT IS YOU */
        /** battleData[0] = opponent
         * battleData[1] = player
         */
      }
      const { buff: opponentBuff } = await getPlayerBuff({
        playerType: battleData[0]?.types!,
        playerWeaknesses: playerUnFilteredWeakness,
      });
      const { buff: playerBuff } = await getPlayerBuff({
        playerType: battleData[1]?.types!,
        playerWeaknesses: opponentUnFilteredWeakness,
      });

      setPlayerBuffs({
        opponent: opponentBuff,
        player: playerBuff,
      });

      setBattleData(battleData);
    })();
  }, []);

  console.log(playerBuffs);

  return (
    <Stack>
      <Drawer isOpen={true} placement="top" onClose={onClose}>
        <DrawerContent
          minH="100vh"
          backgroundColor="white"
          position={"relative"}
        >
          <Image
            src={beginBattleBg}
            alt="bg"
            width={"100%"}
            height="250px"
            layout="fill"
          />
          <DrawerBody>
            <Flex
              minH="100vh"
              direction={"column"}
              position="relative"
              zIndex={"10000"}
            >
              <Flex justify={"space-around"} gap="1rem">
                {battleData &&
                  battleData?.map((data, idx) => {
                    return (
                      <Flex key={idx} flex="1">
                        <VStack
                          align={
                            idx === battleData.length - 1 ? "end" : "start"
                          }
                          width={"100%"}
                        >
                          <Flex
                            direction={
                              idx === battleData.length - 1
                                ? "row-reverse"
                                : "row"
                            }
                            gap="0.5rem"
                          >
                            <Text
                              fontSize={"2xl"}
                              textTransform="uppercase"
                              letterSpacing={"0.1rem"}
                              fontStyle={"italic"}
                              color={getPokemonElementColor(
                                data?.types[0].type?.name!
                              )}
                            >
                              {" "}
                              {data?.name!}{" "}
                            </Text>
                            <HStack>
                              {battleData[idx]?.types.map((t, root) => {
                                return (
                                  <>
                                    <Tag
                                      key={t.type?.name}
                                      bg={getPokemonElementColor(t.type?.name!)}
                                    >
                                      {t.type?.name}
                                    </Tag>
                                  </>
                                );
                              })}
                            </HStack>
                          </Flex>

                          <Flex
                            w="100%"
                            align={"center"}
                            direction={
                              idx === battleData.length - 1
                                ? "row-reverse"
                                : "row"
                            }
                            gap="0.3rem"
                          >
                            <Text>HP</Text>
                            <Flex
                              position={"relative"}
                              width="100%"
                              direction={
                                idx === battleData.length - 1
                                  ? "row-reverse"
                                  : "row"
                              }
                            >
                              <Text
                                position={"absolute"}
                                left="50%"
                                top="50%"
                                transform={"translate(-50%,-50%)"}
                                color="black"
                                zIndex={1}
                              >
                                {data?.stats[0].base_stat}
                              </Text>
                              <Progress
                                height="20px"
                                bg="gray"
                                borderRadius={"20px"}
                                colorScheme={
                                  idx === battleData.length - 1
                                    ? "red"
                                    : "green"
                                }
                                width={"100%"}
                                transform={
                                  idx === battleData.length - 1
                                    ? "scaleX(-1)"
                                    : "none"
                                }
                                value={data?.stats[0].base_stat}
                              />
                            </Flex>
                          </Flex>
                          {idx === battleData.length - 1
                            ? playerBuffs.player.map((data, idx) => {
                                return (
                                  <HStack key={idx}>
                                    <Tag
                                      bg={getPokemonElementColor(
                                        data.fromPlayerWeakness
                                      )}
                                    >
                                      {data.fromPlayerWeakness} effect
                                    </Tag>
                                    <Tag>Attack +{data.attack}</Tag>
                                  </HStack>
                                );
                              })
                            : playerBuffs.opponent.map((data, idx) => {
                                return (
                                  <HStack key={idx}>
                                    <Tag
                                      bg={getPokemonElementColor(
                                        data.fromPlayerWeakness
                                      )}
                                    >
                                      {data.fromPlayerWeakness} effect
                                    </Tag>
                                    <Tag>Attack +{data.attack}</Tag>
                                  </HStack>
                                );
                              })}
                        </VStack>
                      </Flex>
                    );
                  })}
              </Flex>
              <Flex
                flex="2"
                direction={"row"}
                w="100%"
                align={"center"}
                justify="space-between"
              >
                {battleData &&
                  battleData?.map((data, idx) => {
                    return (
                      <VStack key={idx}>
                        <Text
                          fontSize={"5xl"}
                          color="red"
                          fontWeight={"bold"}
                          fontStyle={"italic"}
                        >
                          -15
                        </Text>
                        <Box
                          position={"relative"}
                          height="15.625rem"
                          width={"15.625rem"}
                          transform={
                            idx === battleData.length - 1
                              ? "none"
                              : "scaleX(-1)"
                          }
                        >
                          <Image
                            alt="myPokemon"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${data?.id}.gif`}
                            layout="fill"
                          />
                        </Box>
                      </VStack>
                    );
                  })}
              </Flex>
              <Flex
                direction={"column"}
                position="absolute"
                top="50%"
                left={"50%"}
                align="center"
                transform={"translate(-50%,-50%)"}
              >
                {time !== 0 && (
                  <Text
                    fontSize={"5xl"}
                    color="red"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {time}
                  </Text>
                )}

                {time === 0 && (
                  <Text
                    fontSize={"5xl"}
                    color="red"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {"FIGHT!!!"}
                  </Text>
                )}
              </Flex>

              <Flex
                justify={"space-around"}
                flex="1"
                align={"center"}
                gap="1rem"
              >
                {battleData &&
                  battleData?.map((data, idx) => {
                    return (
                      <Grid
                        templateColumns={"repeat(5,1fr)"}
                        gap="0.5rem"
                        key={idx}
                      >
                        {data?.moves.map((move) => {
                          return (
                            <Button
                              borderRadius={"0px"}
                              key={move.move?.name}
                              colorScheme={
                                battleData.length - 1 === idx ? "red" : "green"
                              }
                              fontSize={"0.8rem"}
                            >
                              {move.move?.name} {move.move?.pp}
                            </Button>
                          );
                        })}
                      </Grid>
                    );
                  })}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default Fight;

// {idx === battleData.length - 1
//   ? cap?.playerWeakness[root][
//       `${t.type?.name}`
//     ].map((s) => {
//       console.log(s.name);
//       return (
//         <Tag key={s} color="red">
//           {s}
//         </Tag>
//       );
//     })
//   : cap?.opponentWeakness[root][
//       `${t.type?.name}`
//     ].map((s) => {
//       console.log(s);
//       return (
//         <Tag key={s} color="red">
//           {s}
//         </Tag>
//       );
//     })}
