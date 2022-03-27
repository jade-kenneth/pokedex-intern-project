import { Box, Button, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PokemonThemeChanger from "src/components/Pokemon/PokemonThemeChanger";
// import {
//   getPokemonDetailById,
//   IGetPokemonDetailById,
// } from "src/helpers/getPokemonDetailById";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import Pokedex from "src/pages/home";
import { GetServerSideProps } from "next";
import apolloClient from "src/apollo/apollo-client";
import { GET_ALL_POKEMON } from "src/graphql/pokemon/queries/pokemon";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import useBattleState from "src/hooks/useBattleState";
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apolloClient.query<GetAllPokemons>({
    query: GET_ALL_POKEMON,
    variables: { offset: 0, limit: 100 },
  });

  return {
    props: { pokemons: data.pokemons },
  };
};

const PokemonList = ({ pokemons }: GetAllPokemons) => {
  const [fight, setFight] = React.useState<number | null>(null);
  const MotionPokemonThemeChanger = motion(PokemonThemeChanger);
  const battleState = useBattleState((state) => state);
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = () => {
      console.log("heyasa");
      battleState.setMode("list");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return <Pokedex header="Choose an opponent" pokemons={pokemons}></Pokedex>;
};

export default PokemonList;
