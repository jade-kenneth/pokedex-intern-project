import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import pokeball from "public/backgrounds/pokeballBg.png";

import { motion } from "framer-motion";
import { GetAllPokemons_pokemons } from "src/types/pokemon/GetAllPokemons";
import useRecentViewStore from "src/hooks/useRecentViewStore";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import useBattleState from "src/hooks/useBattleState";
import { useRouter } from "next/router";
import Loading from "../Homepage/widgets/Loading";
// import { TypesDetail } from "pages/ssr/pokemon";

interface EachPokemonProps {
  id: number;
  types: GetAllPokemons_pokemons["types"];
}

const EachPokemon: React.FC<EachPokemonProps> = ({ children, types, id }) => {
  const MotionBox = motion(Box);
  const battleState = useBattleState((state) => state);
  const store = useRecentViewStore((state) => state);
  const router = useRouter();

  return (
    <MotionBox
      cursor={"pointer"}
      whileHover={{ scale: 1.1 }}
      borderRadius="sm"
      overflow="hidden"
      bg={getPokemonElementColor(types[0].type?.name!)}
      onClick={() => {
        store.addToRecentView(
          id,
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
        );
      }}
    >
      <Flex
        height={"100%"}
        onClick={() => {
          battleState.mode === "battle" && battleState.setPlayer(id);
          router.push(
            `/home/pokemon-details/${id}/${
              battleState.mode === "battle"
                ? `vs/${battleState.opponentId}/fight`
                : ""
            }`
          );
        }}
      >
        <Flex
          flexDirection="column-reverse"
          h="100%"
          w="100%"
          overflow={"hidden"}
          fontFamily="sans-serif"
          color="white"
          p={2}
        >
          <Flex
            flex="2"
            h="100%"
            align="center"
            justify="end"
            position="relative"
            direction={"row-reverse"}
          >
            <Flex position="absolute" right="-15px" bottom="-20px">
              <Image src={pokeball} alt="ball" width={100} height={100} />
            </Flex>
            <Flex justify={"end"} w="100%" h="100%">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={`${children}`}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/fR2PQAIWgMc+QDkCgAAAABJRU5ErkJggg=="
                width={130}
                height={"100%"}
              />
            </Flex>
          </Flex>
          <Flex flex="2.5" direction={"column"}>
            <Text
              fontSize={battleState.mode === "battle" ? "0.5rem" : "1.5rem"}
              fontWeight="bolder"
              textTransform="capitalize"
            >
              {children}
            </Text>

            {battleState.mode !== "battle" && (
              <Flex direction="column" gap="5px" width={"50%"}>
                {types.map((s) => {
                  const { type } = s;
                  return (
                    <>
                      <Text
                        p={1}
                        textAlign="center"
                        bg="whiteAlpha.500"
                        borderRadius="50px"
                      >
                        {type?.name}
                      </Text>
                    </>
                  );
                })}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default EachPokemon;
