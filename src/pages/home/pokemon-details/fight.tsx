import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
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
import getWeaknessStrengthByType from "src/helpers/getWeaknessStrengthByType";
import getPlayerBuff from "src/helpers/getPlayerBuff";
import { GetEachPokemon_pokemonDetails_moves } from "src/types/pokemon/GetEachPokemon";
import NameType from "src/components/About/Battle/widgets/NameType";
import HPBar from "src/components/About/Battle/widgets/HPBar";
import Skills from "src/components/About/Battle/widgets/Skills";
import Players from "src/components/About/Battle/widgets/Players";
import useBattleStateStore from "src/hooks/useBattleStageStore";

const Fight = () => {
  const router = useRouter();

  const [time, setTime] = useState(3);
  const [running, setRunning] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const store = useBattleStateStore((state) => state);

  const battleState = useBattleState((state) => state);
  const [error, setError] = useState(false);
  const [rematchPlayerHp, setRematchPlayerHp] = useState({
    opponent: 0,
    player: 0,
  });
  /** Note: Opponent = me or you
   * Player = Chosen player/pokemon to fight
   */
  // console.log({ playerWeakness: { ...playerWeakness } });
  const ids: getBattleDataByIdsProps["ids"] = [
    { id: `${battleState.opponentId}` },
    { id: `${battleState.playerId}` },
  ];
  const effect1 =
    store.playerBuffs[`${store.turn[0]}`][0]?.attack !== undefined
      ? store.playerBuffs[`${store.turn[0]}`][0].attack
      : 0;
  const effect2 =
    store.playerBuffs[`${store.turn[0]}`][1]?.attack !== undefined
      ? store.playerBuffs[`${store.turn[0]}`][1].attack
      : 0;
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
        if (time <= 0) {
          setTime(0);
          setRunning(false);
          store.setAttacking(true);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, time]);
  const handleRematch = () => {
    store.setPlayerHP({
      opponent: rematchPlayerHp.opponent,
      player: rematchPlayerHp.player,
    });
    store.setPopUp({ attackName: "", damage: 0 });
    store.setTurn(["opponent", "player"]);
    setTime(3);
    store.setBeforeAttack(5);
    setRunning(true);
    store.setWins(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (store.attacking) {
      timer = setInterval(() => {
        store.setBeforeAttack(store.beforeAttack - 1);
        {
          /** checking first if someone wins already */
        }
        if (store.playerHp.opponent <= 0 || store.playerHp.player <= 0) {
          store.setTurn(
            ([store.turn[0], store.turn[1]] = [store.turn[1], store.turn[0]])
          );
          store.setPopUp({
            ...store.popUp,
            attackName:
              store.playerHp.opponent > 0
                ? `${store.battleData[0]?.name} wins`
                : `${store.battleData[1]?.name} wins`,
          });
          store.setWins(true);
          //someone win set back the turn
          //so pop display to those who wins

          store.setAttacking(false);
        }

        //if countdown is equal to zero then
        //set pop up
        if (store.beforeAttack === 0) {
          /** */
          store.setPopUp({
            damage: store.moves[`${store.turn[0]}`][store.attackIdx].move?.pp!,
            attackName:
              store.moves[`${store.turn[0]}`][store.attackIdx].move?.name!,
          });

          //trigger to ['opponent', 'player']
          // ['player', 'opponent']

          {
            /** add a delay to give time displaying
          so that pop up dont interchange */
          }
          setTimeout(() => {
            store.setTurn(
              ([store.turn[0], store.turn[1]] = [store.turn[1], store.turn[0]])
            );
            store.setAttacking(false);
          }, 3000);

          /**
           * else set to random number
           * ranging 0 to moves length of players turn
           */
        } else if (store.beforeAttack >= 2) {
          store.setAttackIdx(
            Math.floor(Math.random() * store.moves[`${store.turn[0]}`].length)
          );
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [store.attacking, store.beforeAttack]);

  useEffect(() => {
    if (store.playerHp.opponent <= 0 || store.playerHp.player <= 0) {
      store.setPopUp({
        ...store.popUp,
        attackName:
          store.playerHp.opponent > 0
            ? `${store.battleData[0]?.name} wins`
            : `${store.battleData[1]?.name} wins`,
      });
      store.setAttacking(false);
    } else if (!running) {
      store.setAttacking(true);
      store.setBeforeAttack(5);
      store.setPopUp({ attackName: "", damage: 0 });
      store.setPlayerHP({
        ...store.playerHp,
        [`${store.turn[0]}`]:
          store.playerHp[`${store.turn[0]}`] -
            store.popUp.damage -
            effect1 -
            effect2 <
          0
            ? 0
            : store.playerHp[`${store.turn[0]}`] -
              store.popUp.damage -
              effect1 -
              effect2,
      });
    }
  }, [store.turn]);

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
      store.setPlayerBuffs({ opponent: opponentBuff, player: playerBuff });
      // setMoves({
      //   opponent: battleData[0]?.moves!,
      //   player: battleData[1]?.moves!,
      // });
      store.setMoves({
        opponent: battleData[0]?.moves!,
        player: battleData[1]?.moves!,
      });
      store.setBattleData(battleData);
      setRematchPlayerHp({
        opponent: battleData[0]?.stats[0].base_stat!,
        player: battleData[1]?.stats[0].base_stat!,
      });
      store.setPlayerHP({
        opponent: battleData[0]?.stats[0].base_stat!,
        player: battleData[1]?.stats[0].base_stat!,
      });

      // setPlayerBuffs({
      //   opponent: opponentBuff,
      //   player: playerBuff,
      // });

      // setBattleData(battleData);
    })();
  }, []);

  return (
    <Stack>
      <Drawer isOpen={true} placement="top" onClose={onClose}>
        <Box position={"relative"} zIndex={1000}>
          <Image src={beginBattleBg} alt="bg" layout="responsive" />
        </Box>
        <DrawerContent backgroundColor="transparent">
          <DrawerBody>
            <Flex
              direction={"column"}
              position="relative"
              zIndex={"10000"}
              gap="20px"
            >
              <Flex justify={"space-around"} flex="1" gap="1rem">
                {store.battleData &&
                  store.battleData?.map((data, idx) => {
                    return (
                      <Flex key={idx} flex="1">
                        <VStack
                          align={
                            idx === store.battleData.length - 1
                              ? "end"
                              : "start"
                          }
                          width={"100%"}
                        >
                          {/** NAME AND TYPE */}
                          <NameType data={data!} idx={idx} />

                          {/**HP BAR  */}
                          <HPBar data={data!} idx={idx} />
                          {idx === store.battleData.length - 1
                            ? store.playerBuffs.player.map((data, idx) => {
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
                            : store.playerBuffs.opponent.map((data, idx) => {
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
              <Players />
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
                    {store.wins ? "" : `Battle starts in ${time}`}
                  </Text>
                )}

                {time === 0 && (
                  <Text
                    fontSize={"5xl"}
                    color="red"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {store.wins
                      ? store.playerHp.opponent > 0
                        ? " Victory"
                        : " Defeat "
                      : "FIGHT!!!"}
                  </Text>
                )}
                {store.wins && (
                  <VStack>
                    <Button onClick={() => handleRematch()}>Rematch</Button>
                    <Button>
                      <a
                        href={`/home/pokemon-details/${battleState.opponentId}`}
                      >
                        Go home
                      </a>
                    </Button>
                  </VStack>
                )}
              </Flex>

              <Skills />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default Fight;
