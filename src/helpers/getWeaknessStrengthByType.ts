import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";

interface getDamageByTypesProps {
  types: GetEachPokemon_pokemonDetails["types"];
}

const getWeaknessStrengthByType = async ({ types }: getDamageByTypesProps) => {
  let weakness: Record<string, any>[] = [];
  let resistance: Record<string, any>[] = [];

  for (const type of types) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${type.type?.name}`
    );
    const dataFetched = await response.json();
    weakness.push(
      ...dataFetched.damage_relations.double_damage_from,

      ...dataFetched.damage_relations.half_damage_to,
      ...dataFetched.damage_relations.no_damage_to
    );
    resistance.push(
      ...dataFetched.damage_relations.double_damage_to,

      ...dataFetched.damage_relations.half_damage_from,

      ...dataFetched.damage_relations.no_damage_from
    );
  }
  return {
    weakness: weakness.reduce<string[]>((array, obj) => {
      return array.includes(obj.name) ? array : [...array, obj.name];
    }, []),
    resistance: resistance.reduce<string[]>((array, obj) => {
      return array.includes(obj.name) ? array : [...array, obj.name];
    }, []),
  };
};
export default getWeaknessStrengthByType;
