import { gql } from "@apollo/client";

export const GET_POKEMON_DATA_LIST = gql`
  query GetPokemonDataList {
    pokemon: pokemon_v2_pokemon(limit: 100, offset: 0) {
      id
      name
      base_experience
      element: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_EGG_GROUP = gql`
  query GetEggGroup($id: Int!) {
    egg_group: pokemon_v2_pokemonspecies_by_pk(id: $id) {
      pokemon_v2_pokemonegggroups {
        group: pokemon_v2_egggroup {
          name
        }
      }
    }
  }
`;

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
      id
      name
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }

      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      pokemon_specy: pokemon_v2_pokemonspecy {
        eggroups: pokemon_v2_pokemonegggroups {
          names: pokemon_v2_egggroup {
            name
          }
        }
        description: pokemon_v2_pokemonspeciesflavortexts(
          offset: 0
          limit: 1
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          flavor_text
        }
        egg_cycle: hatch_counter
        gender_rate
        evolution_chain: pokemon_v2_evolutionchain {
          id
          evolutions: pokemon_v2_pokemonspecies {
            evovleTrigger: pokemon_v2_pokemonevolutions {
              min_level
            }
            id
            evolveFrom: evolves_from_species_id
            name
          }
        }
      }
      moves: pokemon_v2_pokemonmoves(
        limit: 9
        where: { pokemon_v2_move: { power: { _gte: 50 } } }
        distinct_on: move_id
      ) {
        move: pokemon_v2_move {
          accuracy
          name
          power
          pp
          effects: pokemon_v2_moveeffect {
            effect: pokemon_v2_moveeffecteffecttexts {
              effect
            }
          }
        }
      }
    }
  }
`;

export const GET_FILTERED_POKEMON = gql`
  query GetFilteredPokemon($type: [String!]) {
    filtered_pokemons: pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $type } } }
      }
    ) {
      name
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_ALL_TYPES = gql`
  query GetAllTypes {
    type: pokemon_v2_type {
      name
    }
  }
`;

export const GET_ALL_POKEMON_NO_LIMIT = gql`
  query GetAllPokemonNoLimit {
    pokemonDetails: pokemon_v2_pokemon {
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
