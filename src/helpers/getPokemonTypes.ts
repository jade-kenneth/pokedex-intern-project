import { useQuery } from "@apollo/client";
import { GET_ALL_TYPES } from "src/graphql/pokemon/queries/pokemon";
import { GetAllTypes } from "src/types/pokemon/GetAllTypes";

const useGetPokemonTypes = () => {
  const { data } = useQuery<GetAllTypes>(GET_ALL_TYPES, {
    context: { clientName: "pokeapi" },
  });

  return { types: data?.type };
};

export default useGetPokemonTypes;
