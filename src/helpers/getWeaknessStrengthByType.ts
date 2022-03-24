import { useCallback, useEffect, useState } from "react";
import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";

interface getDamageByTypesProps {
  types: GetEachPokemon_pokemonDetails["types"];
}

export const getWeaknessStrengthByType = async ({
  types,
}: getDamageByTypesProps) => {
  let data: any = [];
  types.forEach(async (type) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${type.type?.name}`
    );
    const dataFetched = await response.json();

    data.push({
      type: type.type?.name,
      data: {
        weakness: [
          {
            DOUBLE_DAMAGE_FROM: [
              ...dataFetched.damage_relations.double_damage_from,
            ],
          },
          { HALF_DAMAGE_TO: [...dataFetched.damage_relations.half_damage_to] },
          { NO_DAMAGE_TO: [...dataFetched.damage_relations.no_damage_to] },
        ],
        strength: [
          {
            DOUBLE_DAMAGE_TO: [
              ...dataFetched.damage_relations.double_damage_to,
            ],
          },
          {
            HALF_DAMAGE_FROM: [
              ...dataFetched.damage_relations.half_damage_from,
            ],
          },
          { NO_DAMAGE_FROM: [...dataFetched.damage_relations.no_damage_from] },
        ],
      },
    });
  });

  return data;
};
