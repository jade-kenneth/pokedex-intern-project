import { Button, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import useBattleStateStore from "src/hooks/useBattleStageStore";

const Skills = () => {
  const store = useBattleStateStore((state) => state);
  return (
    <Flex justify={"space-around"} flex="1" align={"center"} gap="1rem">
      <Grid templateColumns={"repeat(5,1fr)"} gap="0.5rem">
        {store.battleData &&
          store.battleData[0]?.moves.map((move, mvIdx) => {
            return (
              <Button
                borderRadius={"0px"}
                key={move.move?.name}
                border={
                  mvIdx === store.attackIdx && store.turn[0] === "opponent"
                    ? "3px solid red"
                    : "none"
                }
                colorScheme={"green"}
                fontSize={"0.8rem"}
              >
                {move.move?.name} {move.move?.pp}
              </Button>
            );
          })}
      </Grid>
      <Grid templateColumns={"repeat(5,1fr)"} gap="0.5rem">
        {store.battleData &&
          store.battleData[1]?.moves.map((move, mvIdx) => {
            return (
              <Button
                borderRadius={"0px"}
                key={move.move?.name}
                border={
                  mvIdx === store.attackIdx && store.turn[0] === "player"
                    ? "3px solid red"
                    : "none"
                }
                colorScheme={"red"}
                fontSize={"0.8rem"}
              >
                {move.move?.name} {move.move?.pp}
              </Button>
            );
          })}
      </Grid>
    </Flex>
  );
};

export default Skills;
