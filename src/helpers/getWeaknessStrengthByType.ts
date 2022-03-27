import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";

interface getDamageByTypesProps {
  types: GetEachPokemon_pokemonDetails["types"];
}
export interface IUnfilteredWeaknessStrength {
  weakness: string[];
  resistance: string[];
}
export interface IWeaknessStrength {
  [key: string]: Array<{ name: string }>;
}
const getWeaknessStrengthByType = async ({ types }: getDamageByTypesProps) => {
  let weakness: Array<IWeaknessStrength> = [];
  let resistance: Array<IWeaknessStrength> = [];
  let unFilteredWeakness: IUnfilteredWeaknessStrength["weakness"] = [];
  let unFilteredResistance: IUnfilteredWeaknessStrength["resistance"] = [];
  for (const type of types) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${type.type?.name}`
    );
    const dataFetched = await response.json();
    const weak = [
      ...dataFetched.damage_relations.double_damage_from,

      ...dataFetched.damage_relations.half_damage_to,
      ...dataFetched.damage_relations.no_damage_to,
    ];
    const strength = [
      ...dataFetched.damage_relations.double_damage_to,

      ...dataFetched.damage_relations.half_damage_from,

      ...dataFetched.damage_relations.no_damage_from,
    ];
    const uniqueWeakness = weak.reduce((array, obj) => {
      return array.includes(obj.name) ? array : [...array, obj.name];
    }, []);
    const uniqueResistance = strength.reduce((array, obj) => {
      return array.includes(obj.name) ? array : [...array, obj.name];
    }, []);
    weakness.push({
      [`${type.type?.name}`]: uniqueWeakness,
    });
    resistance.push({
      [`${type.type?.name}`]: uniqueResistance,
    });
    unFilteredResistance.push(...uniqueResistance);
    unFilteredWeakness.push(...uniqueWeakness);
  }

  return {
    weakness,
    resistance,
    unFilteredResistance: unFilteredResistance.reduce<string[]>(
      (array, obj) => {
        return array.includes(obj) ? array : [...array, obj];
      },
      []
    ),
    unFilteredWeakness: unFilteredWeakness.reduce<string[]>((array, obj) => {
      return array.includes(obj) ? array : [...array, obj];
    }, []),
  };
};
export default getWeaknessStrengthByType;
