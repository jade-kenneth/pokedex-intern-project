import { GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions } from "src/types/pokemon/GetEachPokemon";

interface GetPokemonNameById<T> {
  pokemonData: T[];
}

export const getPokemonNameById = <T extends { name: string; id: number }>({
  pokemonData,
}: GetPokemonNameById<T>) => {
  let names: Record<string, any> = {};
  pokemonData.map((data) => {
    const { name } = data;
    names[`${data.id}`] = name;
  });

  return {
    names,
  };
};
