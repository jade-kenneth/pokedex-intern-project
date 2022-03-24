interface GetEvolutionCosts<T> {
  pokemonData: T[];
}

export const getPokemonNameById = <T extends { evolutionTrigger: T }>({
  pokemonData,
}: GetEvolutionCosts<T>) => {
  let names: Record<string, any> = {};
  pokemonData.map((data) => {
    const { evolutionTrigger } = data;
  });
  function getCost() {}
  return {
    names,
  };
};
