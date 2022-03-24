import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  // listView?: boolean;
  // toggleView: (value?: boolean) => void;
  pokemonDetails: GetEachPokemon_pokemonDetails;

  setPokemonDetails: (pokemonDetails: GetEachPokemon_pokemonDetails) => void;
}

const usePokemonDetailStore = create<IStore>(
  devtools((set) => ({
    pokemonDetails: {
      pokemon_specy: {
        eggroups: [],
        gender_rate: 0,
        egg_cycle: 0,
        evolution_chain: {
          __typename: "pokemon_v2_evolutionchain",
          evolutions: [],
          id: 0,
        },
        __typename: "pokemon_v2_pokemonspecies",
      },
      abilities: [],
      height: 0,
      id: 0,
      moves: [],
      name: "",
      stats: [],
      types: [],
      weight: 0,
      __typename: "pokemon_v2_pokemon",
    },
    setPokemonDetails: (pokemonDetails: GetEachPokemon_pokemonDetails) => {
      set((state) => ({
        ...state,
        pokemonDetails,
      }));
    },
  }))
);

export default usePokemonDetailStore;
