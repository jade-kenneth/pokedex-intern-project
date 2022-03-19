import { gql } from "@apollo/client";

const CORE_POKEMON_DATA = gql`
  fragment CorePokemonData on pokemon_v2_pokemon {
    id
    name
  }
`;

export const GET_ALL_POKEMON = gql`
  query GetAllPokemons($limit: Int!, $offset: Int) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_EACH_POKEMON = gql`
  query GetEachPokemon($id: Int!) {
    pokemonDetails: pokemon_v2_pokemon_by_pk(id: $id) {
      ...CorePokemonData
      stats: pokemon_v2_pokemonstats {
        base_stat: base_stat
        stat_name: pokemon_v2_stat {
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
  ${CORE_POKEMON_DATA}
`;
