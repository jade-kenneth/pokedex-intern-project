interface GetPokemonNameById<T> {
  pokemonData: T[];
}
export interface IGetPokemonDetailById {
  names: { [key: string]: string };
  type: { [key: string]: string | undefined };
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
