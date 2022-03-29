import { HStack, Tag } from "@chakra-ui/react";
import React from "react";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import useBattleStateStore from "src/hooks/useBattleStageStore";

const PlayerBuff = () => {
  const store = useBattleStateStore((state) => state);
  let idx = 0;

  {
    idx === store.battleData.length - 1
      ? store.playerBuffs.player.map((data, idx) => {
          return (
            <HStack key={idx}>
              <Tag bg={getPokemonElementColor(data.fromPlayerWeakness)}>
                {data.fromPlayerWeakness} effect
              </Tag>
              <Tag>Attack +{data.attack}</Tag>
            </HStack>
          );
        })
      : store.playerBuffs.opponent.map((data, idx) => {
          return (
            <HStack key={idx}>
              <Tag bg={getPokemonElementColor(data.fromPlayerWeakness)}>
                {data.fromPlayerWeakness} effect
              </Tag>
              <Tag>Attack +{data.attack}</Tag>
            </HStack>
          );
        });
  }
};

export default PlayerBuff;
