import { GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions } from "src/types/pokemon/GetEachPokemon";

interface GetEvolutionCosts {
  pokemon_specy_evolutions: GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions[];
  id: number;
}

export const getEvolutionCosts = ({
  pokemon_specy_evolutions,
  id: pokemonId,
}: GetEvolutionCosts) => {
  let levelCost: number | null = 0;
  pokemon_specy_evolutions.length > 0 &&
    pokemon_specy_evolutions.map((data) => {
      const { evovleTrigger, id } = data;
      if (id == pokemonId) {
        return (levelCost =
          evovleTrigger.length > 0 ? evovleTrigger[0].min_level : 0);
      }
    });

  return {
    levelCost,
  };
};
