import { Button, Flex, Grid, Tag, VStack } from "@chakra-ui/react";
import React from "react";
import useBattleStateStore from "src/hooks/useBattleStageStore";

const Skills = () => {
  const store = useBattleStateStore((state) => state);
  return (
    <Flex
      justify={"space-around"}
      flex="1"
      align={"center"}
      position={"relative"}
      zIndex={"1000"}
      gap="1rem"
    >
      <Grid
        templateColumns={"repeat(5,1fr)"}
        templateRows={"repeat(2,2.5rem)"}
        gap="0.5rem"
      >
        {store.battleData &&
          store.battleData[0]?.moves.map((move, mvIdx) => {
            return (
              <Tag
                borderRadius={"10px"}
                key={move.move?.name}
                alignItems="center"
                bg={
                  mvIdx === store.attackIdx && store.turn[0] === "opponent"
                    ? "red.400"
                    : "white"
                }
                color="green"
              >
                {move.move?.name} {move.move?.pp}
              </Tag>
            );
          })}
      </Grid>
      <Grid
        templateColumns={"repeat(5,1fr)"}
        templateRows={"repeat(2,2.5rem)"}
        gap="0.5rem"
      >
        {store.battleData &&
          store.battleData[1]?.moves.map((move, mvIdx) => {
            return (
              <Tag
                borderRadius={"10px"}
                key={move.move?.name}
                bg={
                  mvIdx === store.attackIdx && store.turn[1] === "opponent"
                    ? "red.400"
                    : "white"
                }
                color="red"
              >
                {move.move?.name} {move.move?.pp}
              </Tag>
            );
          })}
      </Grid>
    </Flex>
  );
};

export default Skills;
