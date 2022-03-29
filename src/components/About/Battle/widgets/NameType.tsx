import { Flex, HStack, Tag, Text } from "@chakra-ui/react";
import React from "react";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import useBattleStateStore from "src/hooks/useBattleStageStore";
import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";
export interface NameTypeProps {
  idx: number;
  data: GetEachPokemon_pokemonDetails;
}

const NameType = ({ idx, data }: NameTypeProps) => {
  const store = useBattleStateStore((state) => state);

  return (
    <Flex
      direction={idx === store.battleData.length - 1 ? "row-reverse" : "row"}
      gap="0.5rem"
    >
      <Text
        fontSize={"2xl"}
        textTransform="uppercase"
        letterSpacing={"0.1rem"}
        fontStyle={"italic"}
        color={getPokemonElementColor(data?.types[0].type?.name!)}
      >
        {" "}
        {data?.name!}{" "}
      </Text>
      <HStack>
        {store.battleData[idx]?.types.map((t, root) => {
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
  );
};

export default NameType;
