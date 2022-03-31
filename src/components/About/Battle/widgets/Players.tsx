import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useBattleStateStore from "src/hooks/useBattleStageStore";
import Image from "next/image";
import LoadingState from "src/components/widgets/LoadingState";
import ImageWithFallback from "src/components/widgets/ImageWithFallback";
import fallBackImage from "public/backgrounds/unknownPokemon.png";
import NextImageWithFallback from "src/components/widgets/NextImageWithFallback";
const Players = () => {
  const store = useBattleStateStore((state) => state);
  // console.log(store.turn);
  const damageEffect1 =
    store.playerBuffs[`${store.turn[0]}`][0]?.attack !== undefined
      ? store.playerBuffs[`${store.turn[0]}`][0].attack
      : 0;
  const damageEffect2 =
    store.playerBuffs[`${store.turn[0]}`][1]?.attack !== undefined
      ? store.playerBuffs[`${store.turn[0]}`][1].attack
      : 0;
  const elementEffect1 =
    store.playerBuffs[`${store.turn[0]}`][0]?.fromPlayerWeakness;
  const elementEffect2 =
    store.playerBuffs[`${store.turn[0]}`][1]?.fromPlayerWeakness;
  return (
    <Flex
      flex="2"
      direction={"row"}
      w="100%"
      align={"center"}
      justify="space-between"
      position={"relative"}
    >
      <VStack>
        <Text
          fontSize={"2xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.wins
            ? ""
            : store.beforeAttack > 0 && store.turn[0] === "opponent"
            ? `Attacking in ${store.beforeAttack}`
            : ""}
        </Text>
        <Text
          fontSize={"2xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.turn[0] === "player"
            ? store.popUp.damage > 0 &&
              `-${store.popUp.damage + +damageEffect1 + damageEffect2}`
            : store.popUp.attackName}
        </Text>
        <Box width={"12rem"} transform={"scaleX(-1)"}>
          <ImageWithFallback
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[0]?.id}.gif`}
            fallbackImage="/backgrounds/unknownPokemon.png"
            width="100%"
            loader={<LoadingState />}
          />
          {/* <NextImageWithFallback
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[0]?.id}.gif`}
            alt="profile"
            width={10}
            height={10}
            layout="responsive"
            fallbackSrc={fallBackImage}
          /> */}
        </Box>
      </VStack>
      <VStack>
        <Text
          fontSize={"2xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {store.wins
            ? ""
            : store.beforeAttack > 0 && store.turn[0] === "player"
            ? `Attacking in ${store.beforeAttack}`
            : ""}
        </Text>
        <Text
          fontSize={"2xl"}
          color="red"
          fontWeight={"bold"}
          fontStyle={"italic"}
          height="5rem"
        >
          {/**if last opponent */}
          {store.turn[0] === "player"
            ? store.popUp.attackName
            : store.popUp.damage > 0 &&
              `-${store.popUp.damage + damageEffect1 + damageEffect2}`}
        </Text>
        <Box position={"relative"} width={"12rem"}>
          {/** next image dont support gif */}
          {/* <NextImageWithFallback
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[1]?.id}.gif`}
            alt="profile"
            width={10}
            height={10}
            layout="responsive"
            fallbackSrc={fallBackImage}
          /> */}
          <ImageWithFallback
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${store.battleData[1]?.id}.gif`}
            fallbackImage="/backgrounds/unknownPokemon.png"
            width="100%"
            loader={<LoadingState />}
          />
        </Box>
      </VStack>
    </Flex>
  );
};

export default Players;
