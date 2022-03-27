import { GET_EACH_POKEMON } from "src/graphql/pokemon/queries/pokemon";
import {
  GetEachPokemon,
  GetEachPokemonVariables,
  GetEachPokemon_pokemonDetails,
} from "src/types/pokemon/GetEachPokemon";
import apolloClient from "src/apollo/apollo-client";
export interface getBattleDataByIdsProps {
  ids: Array<{ id: string }>;
}
export interface IBattleData {
  battleData: Array<GetEachPokemon["pokemonDetails"]>;
}
const getBattleDataByIds = async (ids: getBattleDataByIdsProps["ids"]) => {
  const battleData: IBattleData["battleData"] = [];
  for (const id of ids) {
    const { data } = await apolloClient.query<
      GetEachPokemon,
      GetEachPokemonVariables
    >({
      query: GET_EACH_POKEMON,
      variables: { id: parseInt(id.id) },
      context: { clientName: "pokeapi" },
    });

    battleData.push(data.pokemonDetails);
  }

  return {
    battleData,
  };
};
export default getBattleDataByIds;
