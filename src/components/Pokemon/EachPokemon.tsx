import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import pokeball from "public/backgrounds/pokeballBg.png";
import PokemonThemeChanger from "./PokemonThemeChanger";
import { motion } from "framer-motion";
import { GetAllPokemons_pokemons } from "src/types/pokemon/GetAllPokemons";
import useRecentViewStore from "src/hooks/useRecentViewStore";
// import { TypesDetail } from "pages/ssr/pokemon";

interface EachPokemonProps {
  id: number;
  types: GetAllPokemons_pokemons["types"];
}

const EachPokemon: React.FC<EachPokemonProps> = ({ children, types, id }) => {
  const MotionPokemonThemeChanger = motion(PokemonThemeChanger);
  const store = useRecentViewStore((state) => state);
  return (
    <MotionPokemonThemeChanger
      whileHover={{ scale: 1.1 }}
      borderRadius="sm"
      overflow="hidden"
      pokemonType={types[0].type?.name}
      onClick={() =>
        store.addToRecentView(
          id,
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
        )
      }
    >
      <Link
        href={{
          pathname: `/home/pokemon-details/${id}`,
        }}
      >
        <a>
          <Flex
            flexDirection="column-reverse"
            p={2}
            h="100%"
            fontFamily="sans-serif"
            overflow="hidden"
            color="white"
          >
            <Flex
              flex="2"
              h="100%"
              w="100%"
              align="center"
              direction="row-reverse"
              justify="center"
              position="relative"
            >
              <Box position="absolute" right="-15px" bottom="-20px">
                <Image src={pokeball} alt="ball" width={100} height={100} />
              </Box>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={`${children}`}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/fR2PQAIWgMc+QDkCgAAAABJRU5ErkJggg=="
                width={130}
                height={130}
              />
              <Spacer />
            </Flex>
            <Flex flex="1" direction={"column"}>
              <Text
                fontSize="1.5rem"
                fontWeight="bolder"
                textTransform="capitalize"
              >
                {children}
              </Text>

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
            </Flex>
          </Flex>
        </a>
      </Link>
    </MotionPokemonThemeChanger>
  );
};

export default EachPokemon;
