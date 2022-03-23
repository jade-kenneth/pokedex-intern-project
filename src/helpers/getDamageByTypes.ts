import { useEffect, useState } from "react";
import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";

interface getDamageByTypesProps {
  types: GetEachPokemon_pokemonDetails["types"];
}

export const useGetDamageByTypes = ({ types }: getDamageByTypesProps) => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (function getData() {
      types.map(async (type) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${type.type?.name}`
        );

        const dataFetched = await response.json();
        setData({
          ...data,
          type: type.type?.name,
          weakness: dataFetched.damage_relations.double_damage_from,
          strength: dataFetched.damage_relations.double_damage_to,
        });
        console.log("data", dataFetched);
      });
    })();
  }, []);

  return { data };
};
