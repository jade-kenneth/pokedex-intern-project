import { GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions } from "src/types/pokemon/GetEachPokemon";

interface GetPokemonFormProps {
  evolutions: GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions[];
}

export const useGetPokemonNameById = ({ evolutions }: GetPokemonFormProps) => {
  let names: any = {};
  evolutions.map((data) => {
    const { id, name, evolveFrom } = data;
    names[`${id}`] = name;
  });

  return {
    names,
  };
};
