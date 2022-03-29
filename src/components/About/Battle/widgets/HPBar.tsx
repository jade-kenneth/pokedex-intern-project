import { Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";
import useBattleStateStore from "src/hooks/useBattleStageStore";
import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";

export interface HPBarProps {
  idx: number;
  data: GetEachPokemon_pokemonDetails;
}

const HPBar = ({ idx, data }: HPBarProps) => {
  const store = useBattleStateStore((state) => state);

  return (
    <Flex
      w="100%"
      align={"center"}
      direction={idx === store.battleData.length - 1 ? "row-reverse" : "row"}
      gap="0.3rem"
    >
      <Text>HP</Text>
      <Flex
        position={"relative"}
        width="100%"
        direction={idx === store.battleData.length - 1 ? "row-reverse" : "row"}
      >
        <Text
          position={"absolute"}
          left="50%"
          top="50%"
          transform={"translate(-50%,-50%)"}
          color="black"
          zIndex={1}
        >
          {idx === store.battleData.length - 1
            ? store.playerHp.player
            : store.playerHp.opponent}
        </Text>
        <Progress
          height="20px"
          bg="gray"
          borderRadius={"20px"}
          colorScheme={idx === store.battleData.length - 1 ? "red" : "green"}
          width={"100%"}
          transform={
            idx === store.battleData.length - 1 ? "scaleX(-1)" : "none"
          }
          value={
            idx === store.battleData.length - 1
              ? store.playerHp.player
              : store.playerHp.opponent
          }
        />
      </Flex>
    </Flex>
  );
};

export default HPBar;
