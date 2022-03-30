import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useBattleStateStore from "src/hooks/useBattleStageStore";
import Image from "next/image";
const Players = () => {
  const store = useBattleStateStore((state) => state);
  // console.log(store.turn);

  return (
    <Flex
      flex="2"
      direction={"row"}
      w="100%"
      align={"center"}
      justify="space-between"
    >
      <VStack>
        <Text
          fontSize={"5xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.wins
            ? ""
            : store.beforeAttack > 0 && store.turn[0] === "opponent"
            ? store.beforeAttack
            : ""}
        </Text>
        <Text
          fontSize={"5xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.turn[0] === "player"
            ? store.popUp.damage > 0 && `-${store.popUp.damage}`
            : store.popUp.attackName}
        </Text>
        <Box
          position={"relative"}
          height="15.625rem"
          width={"15.625rem"}
          transform={"scaleX(-1)"}
        >
          <Image
            alt="myPokemon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[0]?.id}.gif`}
            layout="fill"
          />
        </Box>
      </VStack>
      <VStack>
        <Text
          fontSize={"5xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.wins
            ? ""
            : store.beforeAttack > 0 && store.turn[0] === "player"
            ? store.beforeAttack
            : ""}
        </Text>
        <Text
          fontSize={"5xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {/**if last opponent */}
          {store.turn[0] === "player"
            ? store.popUp.attackName
            : store.popUp.damage > 0 && `-${store.popUp.damage}`}
        </Text>
        <Box position={"relative"} height="15.625rem" width={"15.625rem"}>
          <Image
            alt="myPokemon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[1]?.id}.gif`}
            layout="fill"
          />
        </Box>
      </VStack>
    </Flex>
  );
};

export default Players;
