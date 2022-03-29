import React from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import loginBg from "public/backgrounds/loginBg.png";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";

import EachPokemon from "src/components/Pokemon/EachPokemon";
import { PokedexProps } from "src/pages/home";
import useBattleState from "src/hooks/useBattleState";

const GridView = ({ pokemons }: PokedexProps) => {
  // auto-fill, minmax(11.5rem,1fr)
  const battleState = useBattleState((state) => state);
  console.log(battleState);
  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2,1fr)",
        md: "repeat(2,1fr)",
        lg: battleState.mode === "battle" ? "repeat(5,1fr)" : "repeat(5, 1fr)",
      }}
      templateRows={{
        base: "repeat(6,16.188rem)",
        md: "repeat(4,16.188rem)",
        lg:
          battleState.mode === "battle"
            ? "repeat(2,100px)"
            : "repeat(2, 16.188rem)",
      }}
      gap={battleState.mode === "battle" ? "1rem" : "2rem"}
    >
      {/**grid*/}
      {pokemons.map((pokemon) => {
        const { id, types, name } = pokemon;
        return (
          <React.Fragment key={id}>
            <EachPokemon id={id} types={types}>
              {name}
            </EachPokemon>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default GridView;
