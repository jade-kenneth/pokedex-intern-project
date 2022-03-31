import React, { useEffect } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import loginBg from "public/backgrounds/loginBg.png";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";

import EachPokemon from "src/components/Pokemon/EachPokemon";
import { PokedexProps } from "src/pages/home";
import useBattleState from "src/hooks/useBattleState";
import Loading from "./widgets/Loading";

interface GridViewProps {
  pokemons: PokedexProps["pokemons"];
  loading: boolean;
}

const GridView = ({ loading, pokemons }: GridViewProps) => {
  // auto-fill, minmax(11.5rem,1fr)
  const battleState = useBattleState((state) => state);

  if (loading) return <Loading type="loading" />;

  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",

        md: "repeat(2,1fr)",
        lg: "repeat(5,1fr)",
      }}
      gap={battleState.mode === "battle" ? "1rem" : "2rem"}
    >
      {/**grid*/}
      {pokemons.map((pokemon) => {
        const { id, types, name } = pokemon;
        return (
          <>
            <EachPokemon key={id} id={id} types={types}>
              {name}
            </EachPokemon>
          </>
        );
      })}
    </Grid>
  );
};

export default GridView;
