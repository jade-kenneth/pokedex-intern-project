import React from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import loginBg from "public/backgrounds/loginBg.png";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import PokemonThemeChanger from "src/components/Pokemon/PokemonThemeChanger";
import EachPokemon from "src/components/Pokemon/EachPokemon";

const GridView = ({ pokemons }: GetAllPokemons) => {
  // auto-fill, minmax(11.5rem,1fr)

  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat( 5, 1fr)",
      }}
      templateRows={{
        base: "repeat(6,16.188rem)",
        md: "repeat(4,16.188rem)",
        lg: "repeat(2, 16.188rem)",
      }}
      gap="2rem"
    >
      {/**grid*/}
      {pokemons.map((pokemon) => {
        const { id, types, name } = pokemon;
        return (
          <EachPokemon key={id} id={id} types={types}>
            {name}
          </EachPokemon>
        );
      })}
    </Grid>
  );
};

export default GridView;
